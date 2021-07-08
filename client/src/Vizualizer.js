import React from 'react';
import Sketch from "react-p5";



export default function Vizualizer (props) {
  let song;
  let img;
  let fft;
  let particles = []

  function preload(p5) {
    song = p5.loadSound('assets/test.mp3');
    img = p5.loadImage('assets/background.jpeg')
  }

  function setup(p5) {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.angleMode(p5.DEGREES)
    p5.imageMode(p5.CENTER)
    fft = new p5.FFT();

    img.p5.filter(p5.BLUR, 12)

    p5.noLoop()
  }


  function draw(p5, amp) {
    p5.background(0)
    p5.stroke(255)
    p5.strokeWeight(3)
    p5.noFill();

    p5.translate(p5.width/2, p5.height /2)

    fft.analyze(p5)
    amp = fft.getEnergy(20, 200)

    p5.push()
    if (p5.amp > 230) {
      p5.rotate(p5.random(-0.5, 0.5))
    }

    p5.image(img, 0, 0, p5.width, p5.height)
    p5.pop()


    let wave = fft.p5.waveform()



    for (var t = -1; t <= 1; t += 2) {
      p5.beginShape()
    for (let i = 0; i <= 180; i += 0.5) {
      let index = p5.floor(p5.map(i, 0, 180, 0, wave.length - 1))

      let r = p5.map(wave[index], -1, 1, 150, 350)

      let x = r * p5.sin(i) * t
      let y = r * p5.cos(i)
      p5.vertex(x,y)
    }
    p5.endShape()
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



  function mousePressed(p5) {
    if (song.isPlaying()) {
      // .isPlaying() returns a boolean
      song.pause(); // .play() will resume from .pause() position
      p5.noLoop()
    } else {
      song.play();
      p5.loop()
    }
  }

  class Particle {
    constructor(p5){
      this.pos = p5.Vector.random2D().mult(250)
      this.vel = p5.createVector(0, 0)
      this.acc = this.pos.copy().mult(p5.random(0.0001, 0.00001))

      this.w = p5.random(3,5)

      this.color = [p5.random(200, 255), p5.random(200, 255), p5.random(0, 255)]
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
    edges(p5) {
      if (this.pos.x <-p5.width / 2 || this.pos.x > p5.width / 2 ||
         this.pos.y < -p5.height /2 || this.pos.y > p5.height / 2) {
        return true
      } else {
        return false
      }
    }

    show(p5) {
      p5.noStroke()
      p5.fill(this.color)
      p5.ellipse(this.pos.x, this.pos.y, this.w)
    }
  }


	return <Sketch setup={setup} draw={draw} />;
};