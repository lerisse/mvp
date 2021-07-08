let song;
let fft;

function preload() {
  song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  fft = new p5.FFT();
}


function draw() {
  background(0)
  stroke(255)
  noFill();

  translate(width/2, height /2)

  let wave = fft.waveform()




  beginShape()
  for (let i = 0; i <= 180; i++) {
    let index = floor(map(i, 0, 180, 0, wave.length - 1))

    let r = map(wave[index], -1, 1, 150, 350)

    let x = r * sin(i)
    let y = r * cos(i)
    vertex(x,y)
  }
  endShape()
   beginShape()
  for (let i = 0; i <= 180; i++) {
    let index = floor(map(i, 0, 180, 0, wave.length - 1))

    let r = map(wave[index], -1, 1, 150, 350)

    let x = r * -sin(i)
    let y = r * cos(i)
    vertex(x,y)
  }
  endShape()
}


function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause(); // .play() will resume from .pause() position
    noLoop()
  } else {
    song.play();
    loop()
  }
}
