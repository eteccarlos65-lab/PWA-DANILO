import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Guarda o arquivo em memória: o botão "resetar câmera" remonta o viewer e não precisa baixar de novo.
THREE.Cache.enabled = true;

const MODEL_URL = `${import.meta.env.BASE_URL}models/car.glb`;
const CAR_LENGTH = 4.4; // comprimento do carro na cena (unidades three)
const TARGET = new THREE.Vector3(0, 0.85, 0);

interface ThreeCarViewerProps {
  bodyColorHex?: number;
  caliperColorHex?: number;
  wireframe?: boolean;
  anglePreset?: 'lateral' | 'frontal' | 'pista' | null;
  onResetView?: () => void;
}

/**
 * O modelo tem UMA textura "assada" (sem materiais separados para pintura/pinça).
 * Por isso a cor da pintura e da pinça de freio são trocadas no shader:
 *  - pintura  = pixels escuros de tom azulado, fora da área dos pneus
 *  - pinça    = pixels vermelhos dentro do volume das rodas
 * Coordenadas abaixo estão no espaço local da malha (x = largura, y = comprimento, -z = altura).
 */
const injectRecolor = (
  shader: { uniforms: Record<string, unknown>; vertexShader: string; fragmentShader: string },
  paint: { value: THREE.Color },
  caliper: { value: THREE.Color },
) => {
  shader.uniforms.uPaint = paint;
  shader.uniforms.uCaliper = caliper;

  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vAuraPos;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nvAuraPos = position;');

  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      '#include <common>\nuniform vec3 uPaint;\nuniform vec3 uCaliper;\nvarying vec3 vAuraPos;',
    )
    .replace(
      '#include <map_fragment>',
      `#include <map_fragment>
      {
        vec3 c = diffuseColor.rgb;
        float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));

        float dRear  = length(vec2(vAuraPos.y + 0.334, -vAuraPos.z - 0.102));
        float dFront = length(vec2(vAuraPos.y - 0.356, -vAuraPos.z - 0.102));
        float dWheel = min(dRear, dFront);

        float tire = (1.0 - smoothstep(0.108, 0.125, dWheel)) * smoothstep(0.15, 0.19, abs(vAuraPos.x));
        float paintMask = smoothstep(1.15, 1.45, c.b / max(c.r, 0.0001))
                        * (1.0 - smoothstep(0.12, 0.25, lum))
                        * (1.0 - tire);
        vec3 paintCol = uPaint * clamp(lum / 0.035, 0.35, 2.4);

        float redMask = smoothstep(1.8, 3.0, c.r / max(max(c.g, c.b), 0.0001)) * smoothstep(0.02, 0.08, c.r);
        float caliperMask = redMask * (1.0 - smoothstep(0.11, 0.14, dWheel));
        vec3 caliperCol = uCaliper * clamp(lum / 0.1, 0.6, 1.5);

        c = mix(c, paintCol, paintMask);
        diffuseColor.rgb = mix(c, caliperCol, caliperMask);
      }`,
    );
};

export const ThreeCarViewer: React.FC<ThreeCarViewerProps> = ({
  bodyColorHex = 0x18181b,
  caliperColorHex = 0xf59e0b,
  wireframe = false,
  anglePreset = null,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const paintUniformRef = useRef({ value: new THREE.Color(bodyColorHex) });
  const caliperUniformRef = useRef({ value: new THREE.Color(caliperColorHex) });
  const carGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const [fps] = useState(60);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    const width = container.clientWidth || 390;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4.5, 2.2, 5.5);
    camera.lookAt(TARGET);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.replaceChildren(renderer.domElement);

    // Reflexos de estúdio (sem baixar nenhum HDR)
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.9;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const orangeLight = new THREE.PointLight(0xf59e0b, 25, 60);
    orangeLight.position.set(5, 6, 5);
    scene.add(orangeLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 18, 50);
    cyanLight.position.set(-5, 4, -4);
    scene.add(cyanLight);

    const rimLight = new THREE.DirectionalLight(0xffedd5, 1.2);
    rimLight.position.set(0, 8, -5);
    scene.add(rimLight);

    // Car Parent Group (é este grupo que gira)
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carGroupRef.current = carGroup;

    // Ground Grid Platform
    const gridHelper = new THREE.GridHelper(8, 16, 0xf59e0b, 0x27272a);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Circular Ambient Light Ring
    const ringGeo = new THREE.RingGeometry(2.8, 2.95, 48);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.65 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.02;
    scene.add(ringMesh);

    // Modelo 3D (.glb)
    const loader = new GLTFLoader();
    let modelRoot: THREE.Object3D | null = null;

    loader.load(
      MODEL_URL,
      gltf => {
        if (disposed) return;
        const model = gltf.scene;

        // Centraliza no chão e escala para CAR_LENGTH. No arquivo, a frente do carro aponta para +Z.
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const s = CAR_LENGTH / size.z;
        model.scale.setScalar(s);
        model.position.set(-center.x * s, -box.min.y * s, -center.z * s);

        // Gira 90° para a frente apontar para +X (mesma convenção do carro anterior e dos presets de câmera)
        const pivot = new THREE.Group();
        pivot.rotation.y = Math.PI / 2;
        pivot.add(model);
        carGroup.add(pivot);
        modelRoot = pivot;

        const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        model.traverse(obj => {
          const mesh = obj as THREE.Mesh;
          if (!mesh.isMesh) return;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.onBeforeCompile = shader => injectRecolor(shader, paintUniformRef.current, caliperUniformRef.current);
          mat.needsUpdate = true;
          [mat.map, mat.normalMap, mat.metalnessMap].forEach(t => {
            if (t) t.anisotropy = maxAniso;
          });
          modelMaterialRef.current = mat;
        });

        setStatus('ready');
      },
      e => {
        if (!disposed && e.lengthComputable && e.total > 0) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      },
      err => {
        console.error('Falha ao carregar o modelo 3D:', err);
        if (!disposed) setStatus('error');
      },
    );

    // Mouse & Touch Orbit Controls
    let previousPosition = { x: 0, y: 0 };

    const onDown = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      previousPosition = { x: clientX, y: clientY };
    };

    const onMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      const deltaX = clientX - previousPosition.x;
      const deltaY = clientY - previousPosition.y;

      carGroup.rotation.y += deltaX * 0.012;
      camera.position.y = Math.max(0.8, Math.min(3.8, camera.position.y - deltaY * 0.008));
      camera.lookAt(TARGET);

      previousPosition = { x: clientX, y: clientY };
    };

    const onUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.style.touchAction = 'none';
    dom.style.cursor = 'grab';

    const handleMouseDown = (e: MouseEvent) => onDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleMouseUp = () => onUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) onDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchEnd = () => onUp();

    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 390;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDraggingRef.current) {
        carGroup.rotation.y += 0.006;
      }
      ringMesh.rotation.z += 0.003;
      camera.lookAt(TARGET);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      modelRoot?.traverse(obj => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const mat = mesh.material as THREE.MeshStandardMaterial;
        Object.values(mat).forEach(v => {
          if (v instanceof THREE.Texture) v.dispose();
        });
        mat.dispose();
      });
      modelMaterialRef.current = null;
      ringGeo.dispose();
      ringMat.dispose();
      gridHelper.geometry.dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  // Update body color (pintura)
  useEffect(() => {
    paintUniformRef.current.value.setHex(bodyColorHex);
  }, [bodyColorHex]);

  // Update caliper color (pinça de freio)
  useEffect(() => {
    caliperUniformRef.current.value.setHex(caliperColorHex);
  }, [caliperColorHex]);

  // Update wireframe mode
  useEffect(() => {
    if (modelMaterialRef.current) {
      modelMaterialRef.current.wireframe = wireframe;
    }
  }, [wireframe, status]);

  // Update angle presets
  useEffect(() => {
    if (!cameraRef.current || !carGroupRef.current) return;
    if (anglePreset === 'lateral') {
      carGroupRef.current.rotation.y = Math.PI / 2;
      cameraRef.current.position.set(0, 1.2, 5.2);
    } else if (anglePreset === 'frontal') {
      carGroupRef.current.rotation.y = -Math.PI / 5;
      cameraRef.current.position.set(3.8, 1.6, 4.5);
    } else if (anglePreset === 'pista') {
      carGroupRef.current.rotation.y = 0.7;
      cameraRef.current.position.set(4.8, 3.0, 5.0);
    }
    cameraRef.current.lookAt(TARGET);
  }, [anglePreset]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full overflow-hidden" />
      <div className="absolute top-2.5 right-3 flex items-center gap-1.5 pointer-events-none">
        <span className="font-space text-[10px] text-amber-400 font-semibold bg-zinc-900/80 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/20">
          {fps} FPS
        </span>
      </div>

      {status === 'loading' && (
        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 pointer-events-none">
          <span className="font-space text-[10px] uppercase tracking-wider text-amber-400">
            Carregando modelo 3D{progress !== null ? ` ${progress}%` : '…'}
          </span>
          <div className="w-32 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full bg-amber-500 transition-all duration-300 ${progress === null ? 'w-1/3 animate-pulse' : ''}`}
              style={progress !== null ? { width: `${progress}%` } : undefined}
            />
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-space text-[10px] uppercase tracking-wider text-red-400 bg-zinc-900/80 px-3 py-1.5 rounded border border-red-500/30">
            Não foi possível carregar o modelo 3D
          </span>
        </div>
      )}
    </div>
  );
};
