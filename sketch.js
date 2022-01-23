var fft, amplitude, peakDetect, spectrum, level, treble, highMid, mid, lowMid, bass, centroid;
var pBass, pLowMid, pMid, pHighMid, pTreble;
var casl, size;
var chars, FFTchunks;

function preload() {
  song = loadSound('iFeel.mp3');

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
  //console.log(chars);
  // let span = createSpan(chars[0]);
  for (let i = 0; i < chars.length; i++) {
    let span = createSpan(chars[i]);
    span.parent(text);
  }
  //console.log(text.child()[0].style.);
  // console.log(text.child())
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

  //console.log(h)
  // variable.style('font-variation-settings', " 'SCAN' " + 100);


  // let waveform = fft.waveform();
  // noFill();
  // beginShape();
  // stroke(20);
  // for (let i = 0; i < waveform.length; i++) {
  //   let x = map(i, 0, waveform.length, 0, width);
  //   let y = map(waveform[i], -1, 1, 0, height);
  //   vertex(x, y);
  //   variable.style('font-variation-settings', " 'BLED' " + y + ", 'SCAN' " + h);
  // }
  // endShape();

  //variable.style('font-weight', '100');

  FFTchunks = splitIntoN(spectrum, text.child().length)
  //console.log(FFTchunks)



  //console.log(spectrum)
  //console.log(getAvg(FFTchunks[0]));
  let FFTavg = [];
  for (let i = 0; i < FFTchunks.length; i++) {
    FFTavg.push(calculateAvg(FFTchunks[i]));
  }

  for (let i = 0; i < text.child().length; i++) {
    let wdth = map(FFTavg[i], 0, 255, 50, 200);
    let size = map(FFTavg[i], 0, 255, 100, 700);
    text.child()[i].style.fontVariationSettings = "'wdth' " + wdth;
    //  text.child()[i].style.fontSize = size;
  }

  //console.log(FFTavg)
  //console.log(text.child().length)
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

// function spliceIntoChunks(arr, chunkSize) {
//   const res = [];
//   while (arr.length > 0) {
//     const chunk = arr.splice(0, chunkSize);
//     res.push(chunk);
//   }
//   return res;
// }

function splitIntoN(arr, num) {
  const res = [];
  const itemPerArray = Math.ceil(arr.length / num)
  while (arr.length > 0) {
    const chunk = arr.splice(0, itemPerArray);
    res.push(chunk);
  }
  return res;
}

// function getAvg(arr) {
//   let total = [];
//   for (let i = 0; i < arr.length; i++) {
//     total += arr[i];
//     //console.log(arr[i])

//   }
//   let avg = total / arr.length
//   // console.log(avg)
//   return avg;
// }
function calculateAvg(array) {
  return array.reduce((a, b) => a + b) / array.length;
}