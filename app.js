const buttonEl = document.querySelector('button');

// Create our context
let audioContext = new AudioContext();

// function which is called when we click the button 
function laserate() {

// create an oscillator node
let osc = audioContext.createOscillator();
// set type - can be sine, square, sawtooth, triangle
osc.type = 'triangle';
// set frequency
osc.frequency.value = 350;
// up frequency over a second
osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 1);
// create a gain node 
let gain = audioContext.createGain();
// gain by default is 1 - drop it to near mute after about a second
gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.9);


// start oscillator
osc.start();
// stop after a seccond
osc.stop(audioContext.currentTime + 1);
// connect our graph
osc.connect(gain).connect(audioContext.destination);
}

buttonEl.addEventListener('click', function() {

	// autoplay - state will be suspended by default, resume on click
	if (audioContext.state === "suspended") {
		audioContext.resume();
	}

	// call our laser function
	laserate();

})