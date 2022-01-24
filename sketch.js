var fft, amplitude, peakDetect, spectrum, level, treble, highMid, mid, lowMid, bass, centroid;
var pBass, pLowMid, pMid, pHighMid, pTreble;
var casl, size;
var chars, FFTchunks, waveformChunks;

function preload() {
  song = loadSound('songs/doubt.mp3');
  variable = select('.variable');
  playButton = select('.play_button')
  text = select('.text')
}

function setup() {
  //noCanvas();
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
  //console.log(chars);
  // let span = createSpan(chars[0]);
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] != " ") {
      let span = createSpan(chars[i]);
      span.parent(text);
    }
  }

  //console.log(text.child()[0].style.);
  // console.log(text.child())
}

function draw() {
  //background(220);

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

  //size = map(level, 0, 0.4, 50, 200);
  //pSize = map(level, 0, 0.4, 50, 100);


  // waveform calculations
  let waveform = fft.waveform();

  waveformChunks = splitIntoN(waveform, text.child().length)
  let waveformAvg = [];
  for (let i = 0; i < waveformChunks.length; i++) {
    waveformAvg.push(calculateAvg(waveformChunks[i]));
  }


  //FFT spectrum calculations

  FFTchunks = splitIntoN(spectrum, text.child().length)

  let FFTavg = [];
  for (let i = 0; i < FFTchunks.length; i++) {
    FFTavg.push(calculateAvg(FFTchunks[i]));
  }


  //Text styling
  for (let i = 0; i < text.child().length; i++) {
    let bled = map(FFTavg[i], 0, 255, 0, 500);
    let scan = map(waveformAvg[i], 0, 1, -800, 1000);


    text.child()[i].style.fontVariationSettings = "'SCAN' " + scan + ", 'BLED' " + bled;


    let size = map(highMid, 0, 255, 200, 250);
    text.child()[i].style.fontSize = size;

  }

}

//Toggle playing, obvi
function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();


  } else if (song.isPlaying()) {
    song.pause();

  }
}

//Utility

function splitIntoN(arr, num) {
  const res = [];
  const itemPerArray = Math.ceil(arr.length / num)
  while (arr.length > 0) {
    const chunk = arr.splice(0, itemPerArray);
    res.push(chunk);
  }
  return res;
}

function calculateAvg(array) {
  return array.reduce((a, b) => a + b) / array.length;
}