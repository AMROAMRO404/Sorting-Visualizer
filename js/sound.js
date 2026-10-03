// Optional sound: plays a short tone whose pitch follows the value being moved.

class Beeper {
  static MIN_GAP_MS = 30; // skip tones that would pile up at high speeds

  constructor() {
    this.enabled = false;
    this.context = null;
    this.lastBeep = 0;
  }

  // Browsers only allow audio to start from a user action, so the audio
  // context is created the first time sound is switched on.
  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      this.enabled = false;
      return;
    }
    if (!this.context) this.context = new AudioContextClass();
    this.context.resume();
  }

  // level is between 0 (lowest pitch) and 1 (highest pitch).
  play(level) {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastBeep < Beeper.MIN_GAP_MS) return;
    this.lastBeep = now;

    const start = this.context.currentTime;
    const duration = 0.06;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = 200 + level * 800;
    gain.gain.setValueAtTime(0.08, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    oscillator.connect(gain).connect(this.context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  }
}
