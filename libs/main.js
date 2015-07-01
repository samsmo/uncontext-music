import { Oscillator } from './osc/default';

const twelthRoot = Math.pow(2, (1/12));

let oscillator = new Oscillator(),
    lfo = new Oscillator(10, 'sine', 1000),
    thirds = [0, 3, 5],
    socket_ = new WebSocket('ws://duel.uncontext.com:80');

lfo.connect(oscillator.freq);

socket_.onmessage = function(data) {
    var parsed = JSON.parse(data.data),
    	steps = thirds[Math.floor(parsed.f * 3)],
    	freq = 440 * Math.pow(twelthRoot, steps);

    oscillator.freq = freq;
    lfo.freq = freq * .5 * parsed.d;
};
