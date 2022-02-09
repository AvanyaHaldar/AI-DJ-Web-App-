song = "";
left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;
scoreleftWrist = 0;
scorerightWrist=0;

function setup() {
  canvas = createCanvas(695, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on("pose", getPoses);

}

function getPoses(results) {
  if (results.length > 0) {
    console.log(results);
    left_wristX = results[0].pose.leftWrist.x;
    left_wristY = results[0].pose.leftWrist.y;
    console.log("Left Wrist X=" + left_wristX + " Left Wrist Y=" + left_wristY);

    right_wristX = results[0].pose.rightWrist.x;
    right_wristY = results[0].pose.rightWrist.y;
    console.log("Right Wrist X=" + right_wristX + " Right Wrist Y=" + right_wristY);

    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log("score left wrist = " + scoreleftWrist);

    scorerightWrist=results[0].pose.keypoints[10].score;
    console.log("score right wrist = " + scorerightWrist);
  }
}

function modelLoaded() {
  console.log("Posenet Is Initialized");
}

function draw() {
  image(video, 0, 0, 700, 500);

  fill("red");
  stroke("red");
  circle(right_wristX, right_wristY, 20);

  if(scorerightWrist>0.2){
    if (right_wristY > 0 && right_wristY <= 100) {
      song.rate(0.5);
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
    }
  
    else if (right_wristY > 100 && right_wristY <= 200) {
      song.rate(1);
      document.getElementById("speed").innerHTML = "Speed = 1x";
    }
  
    else if(right_wristY>200 && right_wristY<=300){
      song.rate(1.5);
      document.getElementById("speed").innerHTML="Speed = 1.5x";
    }
  
    else if(right_wristY>300 && right_wristY<=400){
      song.rate(2);
      document.getElementById("speed").innerHTML="Speed = 2x";
    }
  
    else if(right_wristY>400 && right_wristY<=500){
      song.rate(2.5);
      document.getElementById("speed").innerHTML="Speed = 2.5x";
    }
  
  }
  
  if (scoreleftWrist > 0.2) {

    fill("red");
    stroke("red");
    circle(left_wristX, left_wristY, 20);

    numberleftWristY = Number(left_wristY);
    withoutdecimalLeftWristY = floor(numberleftWristY);
    volume = withoutdecimalLeftWristY / 500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
  }
}

function preload() {
  song = loadSound("music.mp3");
}

function playSong() {
  song.play();
  song.rate(1);
}

function pauseSong() {
  song.pause();
}