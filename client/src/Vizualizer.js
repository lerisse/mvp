import React from 'react';
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";


export default function Vizualizer (props) {
  let song
  let fft

  const preload = (p5) => {
    song = p5.loadSound("./test.mp3");
  }

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    fft = new p5.FFT();
    console.log(fft)
	};

	const draw = (p5) => {
		p5.background(0);
    p5.stroke(255);

    let wave = fft.waveform();

    for (var i = 0; i < p5.width; i++) {
      let index = p5.floor(p5.map(i, 0, p5.width, 0, wave.length));

      let x = i
      let y = wave[index] * 300 + p5.height / 2;
      p5.point(x, y);
    }
	};

  const mouseClicked = (p5) => {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  };

	return <Sketch setup={setup} draw={draw} />;
};