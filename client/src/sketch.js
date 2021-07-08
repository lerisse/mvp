import "./p5"


export default function sketch (props) {
let song;
let img;
let fft;
let particles = []

function preload() {
  song = loadSound('assets/test.mp3');
  img = loadImage('assets/background.jpeg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  imageMode(CENTER)
  fft = new p5.FFT(0);

  img.filter(BLUR, 12)

  noLoop()
}


function draw() {
  background(0)
  stroke(255)
  strokeWeight(3)
  noFill();

  translate(width/2, height /2)

  fft.analyze()
  amp = fft.getEnergy(20, 200)

  push()
  if (amp > 230) {
    rotate(random(-0.5, 0.5))
  }

  image(img, 0, 0, width, height)
  pop()


  let wave = fft.waveform()



  for (var t = -1; t <= 1; t += 2) {
     beginShape()
  for (let i = 0; i <= 180; i += 0.5) {
    let index = floor(map(i, 0, 180, 0, wave.length - 1))

    let r = map(wave[index], -1, 1, 150, 350)

    let x = r * sin(i) * t
    let y = r * cos(i)
    vertex(x,y)
  }
  endShape()
  }

  var p = new Particle()
  particles.push(p)

  for (let i = particles.length -1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230)
      particles[i].show();
    } else {
      particles.splice(i, 1)
    }
  }
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

class Particle {
  constructor(){
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3,5)

    this.color = [random(200, 255), random(200, 255), random(0, 255)]
 }
  update(cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  edges() {
    if (this.pos.x <-width / 2 || this.pos.x > width / 2 ||
       this.pos.y < -height /2 || this.pos.y > height / 2) {
      return true
    } else {
      return false
    }
  }

  show() {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
}
}