// Web Audio API engine sound synthesizer for AURA Hypercar V12 exhaust revving
class EngineSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private isRunning: boolean = false;
  private revInterval: any = null;

  public start(): void {
    if (this.isRunning) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 0.3);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4.5, this.ctx.currentTime);

      // Primary V12 fundamental frequency
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Harmonic cylinder detonation
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

      // Deep exhaust rumble sub-bass
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(35, this.ctx.currentTime);

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.subOsc.connect(this.filter);

      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.subOsc.start();

      this.isRunning = true;

      // Dynamic throttle rev variations simulating 9.200 RPM sweeps
      let direction = 1;
      let currentFreq = 65;
      this.revInterval = setInterval(() => {
        if (!this.ctx || !this.osc1 || !this.filter) return;
        const now = this.ctx.currentTime;
        if (currentFreq >= 190) direction = -1;
        if (currentFreq <= 55) direction = 1;

        currentFreq += direction * (direction > 0 ? 12 : 7);
        this.osc1.frequency.setTargetAtTime(currentFreq, now, 0.1);
        if (this.osc2) this.osc2.frequency.setTargetAtTime(currentFreq * 2, now, 0.1);
        this.filter.frequency.setTargetAtTime(currentFreq * 6.5, now, 0.1);
      }, 100);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  public stop(): void {
    if (!this.isRunning) return;

    if (this.revInterval) {
      clearInterval(this.revInterval);
      this.revInterval = null;
    }

    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.1);
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.subOsc?.stop();
          this.ctx?.close();
        } catch {
          // ignore cleanup errors
        }
        this.ctx = null;
        this.isRunning = false;
      }, 150);
    } else {
      this.isRunning = false;
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const engineAudio = new EngineSoundSynthesizer();
