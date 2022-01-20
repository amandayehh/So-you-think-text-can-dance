var fft, amplitude, peakDetect, spectrum, level, treble, highMid, mid, lowMid, bass, centroid;
var pBass, pLowMid, pMid, pHighMid, pTreble;
var casl, size;

function preload() {
  song = loadSound('iFeel.mp3');

  variable = selectAll('.variable');
  playButton = select('.play_button')
}

function setup() {
  noCanvas();
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

}

function draw() {

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


  //variable.style('font-weight', '100');
  casl = map(level, 0, 0.4, 0, 1);
  //casl = 0.5
  // for (let i = 0; i < variable.length; i++) {
  //   console.log(variable[i]);

  //   variable[i].style('font-size', size);
  //   //variable[i].style('font-size', 200);

  //   //    variable[i].style('font-variation-settings', " 'CASL' " + casl);
  // }
  variable[0].style('font-size', size);

  variable[1].style('font-size', pSize - 10);

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();


  } else if (song.isPlaying()) {
    song.pause();

  }
}