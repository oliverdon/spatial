var AudioContext = window.AudioContext || window.webkitAudioContext;

var ctx = new AudioContext();


var pannerX = 1;
var pannerY = 1;
var pannerZ = 1;

var panner = ctx.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'inverse';
panner.refDistance = 10;
panner.maxDistance = 100000;
panner.rolloffFactor = 1;
panner.coneInnerAngle = 360;
panner.coneOuterAngle = 0;
panner.coneOuterGain = 0;
panner.setOrientation(1,0,0);
panner.setPosition(pannerX,pannerY,pannerZ);




var listener = ctx.listener;
listener.setPosition(-10,-10,-10);


var audio = document.querySelector(".audio-element");
var source = ctx.createMediaElementSource(audio);
source.connect(panner);
panner.connect(ctx.destination);


var xRange = document.getElementById('x-range');
var yRange = document.getElementById('y-range');
var zRange = document.getElementById('z-range');

var xText = document.getElementById('x-text');
var yText = document.getElementById('y-text');
var zText = document.getElementById('z-text');



xRange.oninput = function () {
    pannerX = this.value;
    xText.value = pannerX;
    panner.setPosition(pannerX,pannerY,pannerZ);

}

yRange.oninput = function () {
    pannerY = this.value;
    yText.value = pannerY;
    panner.setPosition(pannerX,pannerY,pannerZ);
}

zRange.oninput = function () {
    pannerZ = this.value;
    zText.value = pannerZ;
    panner.setPosition(pannerX,pannerY,pannerZ);

}