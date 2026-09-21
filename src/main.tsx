import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThreeCarViewer } from './ThreeCarViewer';
import './index.css';

const colors = [
  { name: 'Obsidian', value: 0x18181b },
  { name: 'Pearl', value: 0xd4d4d8 },
  { name: 'Crimson', value: 0x7f1d1d },
  { name: 'Cobalt', value: 0x1d4ed8 },
];

function App() {
  const [color, setColor] = useState(colors[0].value);
  const [angle, setAngle] = useState<'lateral' | 'frontal' | 'pista' | null>('frontal');
  const [wireframe, setWireframe] = useState(false);

  return (
    <main className="min-h-screen bg-[#131316] text-zinc-100">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-10">
        <div>
          <div className="font-syne text-xl font-bold tracking-[0.22em]">AURA</div>
          <div className="font-space text-[9px] uppercase tracking-[0.32em] text-amber-400">Motors / Digital Atelier</div>
        </div>
        <div className="hidden font-space text-xs uppercase tracking-[0.2em] text-zinc-500 sm:block">Hypercar configurator</div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 md:px-10 lg:grid-cols-[1fr_360px]">
        <div className="relative min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-[#0b0b0d] shadow-2xl">
          <div className="absolute left-6 top-6 z-10 max-w-xs">
            <p className="font-space text-[10px] uppercase tracking-[0.28em] text-amber-400">AURA / X1</p>
            <h1 className="mt-2 font-syne text-4xl font-bold tracking-tight md:text-5xl">Designed to<br/>be remembered.</h1>
          </div>
          <ThreeCarViewer bodyColorHex={color} anglePreset={angle} wireframe={wireframe} />
        </div>

        <aside className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
          <div className="mb-7">
            <div className="font-space text-xs uppercase tracking-[0.2em] text-zinc-500">Personalização</div>
            <h2 className="mt-1 font-syne text-2xl font-bold">Seu X1</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between text-sm"><span>Carroceria</span><span className="text-zinc-500">{colors.find(c => c.value === color)?.name}</span></div>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(c => (
                  <button key={c.name} onClick={() => setColor(c.value)} aria-label={c.name} className={`h-10 rounded-xl border ${color === c.value ? 'border-amber-400' : 'border-white/10'} bg-zinc-800`} style={{ background: `#${c.value.toString(16).padStart(6,'0')}` }} />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm">Ângulo</div>
              <div className="grid grid-cols-3 gap-2">
                {(['lateral','frontal','pista'] as const).map(a => (
                  <button key={a} onClick={() => setAngle(a)} className={`rounded-xl border px-2 py-2 text-[10px] uppercase tracking-wider ${angle === a ? 'border-amber-400 bg-amber-400/10 text-amber-300' : 'border-white/10 text-zinc-400'}`}>{a}</button>
                ))}
              </div>
            </div>

            <button onClick={() => setWireframe(v => !v)} className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm">
              <span>Modo técnico</span><span className={wireframe ? 'text-amber-400' : 'text-zinc-600'}>{wireframe ? 'ON' : 'OFF'}</span>
            </button>

            <div className="border-t border-white/10 pt-5">
              <div className="flex justify-between text-sm"><span className="text-zinc-500">Potência</span><span>1.080 CV</span></div>
              <div className="mt-3 flex justify-between text-sm"><span className="text-zinc-500">0–100 km/h</span><span>2,1 s</span></div>
              <div className="mt-3 flex justify-between text-sm"><span className="text-zinc-500">Tração</span><span>AWD</span></div>
            </div>

            <button className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400">Solicitar experiência</button>
          </div>
        </aside>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
