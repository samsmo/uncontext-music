import { Oscillator } from './osc/default';

const twelthRoot = Math.pow(2, (1/12));

let oscillator = new Oscillator(),
    lfo = new Oscillator(10, 'square', 10),
    scale = [0, 1.5, 2, 4, 5],
    socket_ = new WebSocket('ws://duel.uncontext.com:80');

lfo.connect(oscillator.freq);

socket_.onmessage = function(data) {
    var parsed = JSON.parse(data.data),
    	steps = scale[Math.floor(parsed.f * scale.length)],
    	freq = 440 * Math.pow(twelthRoot, steps);

    oscillator.freq = freq;
    lfo.freq = freq * .5;
};
