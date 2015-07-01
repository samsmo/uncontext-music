import { Oscillator } from './osc/default';
import context from './context';

const twelthRoot = Math.pow(2, (1/12)),
	major_scale = [0, 2, 4, 5, 7, 9, 11, 12],
	socket_ = new WebSocket('ws://duel.uncontext.com:80');


/**
 * Socket Message
 * We blindly map the socket data whenever we get it
 * to note frequencies within the A4 Major Scale.
 * These notes are then randomly told a start / stop time
 * in order to get a completely dynamic sound every time we
 * receive data.
 * @param  {[Object]} data [obj {a:[], b: [], c:num, d: num, e:num, f:num}]
 * @return {[Null]}
 */
socket_.onmessage = function(data) {
    let parsed = JSON.parse(data.data),
    	steps = major_scale[Math.floor(parsed.f * major_scale.length)],
    	freq = 440 * Math.pow(twelthRoot, steps),
    	osc = new Oscillator(freq, 'sine', 0),
    	time = context.currentTime;

    	osc.start(time + (7 * parsed.d));
    	osc.stop(time + (10 * parsed.e));
};
