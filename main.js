song="";

function setup() {
    canvas=createCanvas(700,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function draw() {
  image(video,0,0,700,500);  
}

function preload() {
 song=loadSound("music.mp3");   
}

function playSong() {
  song.play();  
}

function pauseSong() {
    song.pause();
}