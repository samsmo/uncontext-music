import context from '../context.js';

/**
 * Base Oscillator
 */
export class Oscillator {

	constructor(freq = 440, wave = 'sine', detune = 0) {

		this.osc = context.createOscillator();
		this.gain = context.createGain();

		this.osc.frequency.value = freq;
		this.osc.type = wave;
		this.osc.detune.value = detune;

		this.gain.gain.value = 0.025;

		this.osc.connect(this.gain);
		this.gain.connect(context.destination);
	}

	connect(destination) {
		this.osc.connect(destination);
	}

	start(time) {
		this.osc.start(time);
	}

	stop(time) {
		this.osc.stop(time);
	}

	set freq(val) {
		this.osc.frequency.value = val;
	}

	get freq() {
		return this.osc.frequency;
	}
}