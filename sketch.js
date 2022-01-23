var fft, amplitude, peakDetect, spectrum, level, treble, highMid, mid, lowMid, bass, centroid;
var pBass, pLowMid, pMid, pHighMid, pTreble;
var casl, size;
var chars;

function preload() {
  song = loadSound('doubt.mp3');

  variable = select('.variable');
  playButton = select('.play_button')
  text = select('.text')
}

function setup() {
  //  noCanvas();
  playButton.mousePressed(togglePlaying)

  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  peakDetect = new p5.PeakDetect();

  pLevel = 0;
  pBass = 0;
  pLowMid = 0;
  pMid = 0;
  pHighMid = 0;
  pTreble = 0;

  //chars = split(variable, '');
  chars = variable.html().split('')
  //console.log(variable.html())
  console.log(chars);
  let span = createSpan(chars[0]);
  span.parent(text)
  for (let i = 0; i < chars.length; i++) {

  }
}

function draw() {
  background(220);

  spectrum = fft.analyze();
  pLevel = level;
  level = amplitude.getLevel();

  pTreble = treble;
  treble = fft.getEnergy('treble');
  pHighMid = highMid;
  highMid = fft.getEnergy('highMid');
  pMid = mid;
  mid = fft.getEnergy('mid');
  pLowMid = lowMid
  lowMid = fft.getEnergy('lowMid');
  pBass = bass;
  bass = fft.getEnergy('bass');

  size = map(level, 0, 0.4, 50, 200);
  pSize = map(level, 0, 0.4, 50, 100);

  // for (let i = 0; i < spectrum.length; i++) {
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h)
  //   //console.log(h);


  // }
  let h = map(spectrum[500], 0, 255, -800, 1000);
  //console.log(h)
  // variable.style('font-variation-settings', " 'SCAN' " + 100);


  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
    variable.style('font-variation-settings', " 'BLED' " + y + ", 'SCAN' " + h);
  }
  endShape();

  //variable.style('font-weight', '100');
  casl = map(level, 0, 0.4, 0, 1);
  //casl = 0.5
  // for (let i = 0; i < variable.length; i++) {
  //   console.log(variable[i]);

  //   variable[i].style('font-size', size);
  //   //variable[i].style('font-size', 200);

  //   //    variable[i].style('font-variation-settings', " 'CASL' " + casl);
  // }

  //variable[1].style('font-size', pSize - 10);

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();


  } else if (song.isPlaying()) {
    song.pause();

  }
}