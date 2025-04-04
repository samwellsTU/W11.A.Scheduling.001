// Convert MIDI note to frequency in Hz
const mtof = function(midiNote) {
    return 440 * Math.pow(2, (midiNote-69)/12)
}

// Super Locrian scale on Bb2 (MIDI note 46)
const superLocrianBb2 = [46, 47, 49, 50, 52, 54, 56];

// Create a new Web Audio API context
const audCtx = new AudioContext();

// Create an oscillator (sound source)
const triWave = audCtx.createOscillator();
triWave.frequency.value = mtof(superLocrianBb2[0]);       // Set frequency to 110 Hz (A2)
triWave.type = "sawtooth";           // Use sawtooth wave type

// Create a low-pass filter
const lpFilter = audCtx.createBiquadFilter()
lpFilter.type = "lowpass";           // Set filter type
lpFilter.frequency.value = 2000;     // Set cutoff frequency to 2000 Hz

// Create a gain node (volume control)
const gainGate = audCtx.createGain()
gainGate.gain.value = 0.             // Start with volume at 0

// Connect audio nodes: oscillator → filter → gain → speakers
triWave.connect(lpFilter);
lpFilter.connect(gainGate);
gainGate.connect(audCtx.destination);

// Track playback state
let onOff = false;

// Set up button to start/stop the oscillator
document.getElementById("onOffButton").addEventListener("click", (event) => {
    if (audCtx.state == 'suspended'){
        audCtx.resume();             // Resume audio context if not running
        triWave.start();             // Start oscillator (only once)
    }
    let now = audCtx.currentTime;

    if (!onOff){
        // Fade in
        gainGate.gain.setValueAtTime(gainGate.gain.value, now)
        gainGate.gain.linearRampToValueAtTime(1., now + 0.05)

        // Update button appearance
        event.target.style.backgroundColor = "red"
        event.target.innerText = "stop";
        onOff = true;
    } else {
        // Fade out
        gainGate.gain.setValueAtTime(gainGate.gain.value, now)
        gainGate.gain.linearRampToValueAtTime(0., now + 0.05)

        // Update button appearance
        event.target.style.backgroundColor = "green"
        event.target.innerText = "start";
        onOff = false;
    }
})

// Update tempo label when tempo slider is moved
document.getElementById("tempo").addEventListener("input", (event) => {
    document.getElementById("templeLabel").innerText = `${event.target.value} bpm`;
})

// Update slide label when slide slider is moved
document.getElementById("slide").addEventListener("input", (event) => {
    document.getElementById("slideLabel").innerText = `${event.target.value} ms`;
})
