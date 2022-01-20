var fft, amplitude, peakDetect, spectrum, level, treble, highMid, mid, lowMid, bass, centroid;
var pBass, pLowMid, pMid, pHighMid, pTreble;
var casl;

function preload() {
  song = loadSound('iFeel.mp3');

  variable = select('.variable');
  playButton = select('.play_button')
}

function setup() {
  noCanvas();
  playButton.mousePressed(togglePlaying)

  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  peakDetect = new p5.PeakDetect();

  pBass = 0;
  pLowMid = 0;
  pMid = 0;
  pHighMid = 0;
  pTreble = 0;

}

function draw() {

  spectrum = fft.analyze();
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


  variable.style('font-size', '200');
  variable.style('font-weight', '100');
  casl = map(level, 0, 0.4, 0, 1);
  //casl = 0.5
  variable.style('font-variation-settings', " 'CASL' " + casl);


}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();


  } else if (song.isPlaying()) {
    song.pause();

  }
}