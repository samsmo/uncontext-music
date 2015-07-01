import { Oscillator } from './osc/default';
import context from './context';

const twelthRoot = Math.pow(2, (1/12));

// Major Scale, hopefully.

let    scale = [0, 2, 4, 5, 7, 9, 11, 12],
	   socket_ = new WebSocket('ws://duel.uncontext.com:80');


// Basic Socket stuff
// Let notes arbitrarily overlap
socket_.onmessage = function(data) {
    var parsed = JSON.parse(data.data),
    	steps = scale[Math.floor(parsed.f * scale.length)],
    	freq = 440 * Math.pow(twelthRoot, steps),
    	osc = new Oscillator(freq, 'sine', 0),
    	time = context.currentTime;

    	osc.start(time + 5);
    	osc.stop(time + 10);

};
