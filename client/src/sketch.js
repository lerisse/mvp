let song;
let fft;

function preload() {
  song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
}


function draw() {
  background(0)
  stroke(255)
  noFill();

  let wave = fft.waveform()


  beginShape()
  for (let i = 0; i < width; i++) {
    let index = floor(map(i, 0, width, 0, wave.length))

    let x = i
    let y = wave[index] * 300 + height / 2
    vertex(x,y)
  }
  endShape()
}


function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause(); // .play() will resume from .pause() position
  } else {
    song.play();
  }
}
