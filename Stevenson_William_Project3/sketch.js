// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
Project 3 - Site Specific Interactive Instillation
William Stevenson
Fall 2021
=== */


let song1;
let song2;
let song3;
let song4;
let song5;
let video;
let poseNet;
let poses = [];
let rightv = 0;



function setup() {
  createCanvas(1430, 765);
  video = createCapture(VIDEO);
  video.size(width, height);
  song1 = loadSound('music/song1.mp3');
  song2 = loadSound('music/song2.mp3');
  song3 = loadSound('music/song3.mp3');
  song4 = loadSound('music/song4.mp3');
  song5 = loadSound('music/song5.mp3');

  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();

}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}





function draw() {
  image(video, 0, 0, width, height);
  
  strokeWeight(2);

  
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

    const leftWrist = pose.leftWrist;
    const rightWrist = pose.rightWrist;
    const leftAnkle = pose.leftAnkle;
    const rightAnkle = pose.rightAnkle;
    const nose = pose.nose;

    
    noStroke();
    textSize(20);
    text("Need to change up the usual mood a little?",550, 665);
    fill(200,200,200);
    ellipse(200, 100, 100, 100);
    fill(229,172,81);
    ellipse(450,100,100,100);
    fill(0,0,0);
    ellipse(700,100,100,100);
    fill(255,0,0);
    ellipse(950,100,100,100);
    fill(0,0,255);
    ellipse(1200,100,100,100);
    fill(200,200,200)

    ellipse(rightWrist.x, rightWrist.y, 50,50);



    if (rightWrist.x > 200  && rightWrist.x < 300 && rightWrist.y > 100 && rightWrist.y < 200) {
      rightv = 1;
    }
    else if (rightWrist.x > 450  && rightWrist.x < 550 && rightWrist.y > 100 && rightWrist.y < 200) {
      rightv = 2;
    }
    else if (rightWrist.x > 700  && rightWrist.x < 800 && rightWrist.y > 100 && rightWrist.y < 200) {
      rightv = 3;
    }
    else if (rightWrist.x > 950  && rightWrist.x < 1050 && rightWrist.y > 100 && rightWrist.y < 200) {
      rightv = 4;
    }
    else if (rightWrist.x > 1200  && rightWrist.x < 1300 && rightWrist.y > 100 && rightWrist.y < 200) {
      rightv = 5;
    }


    if (rightv == 1) {
      text("Theme: Classic", 550,300);
      filter (GRAY);
      song1.play;
    }
    else if (rightv == 2) {
      text("Theme: Painting", 550,300);
      filter (POSTERIZE, 3);
      song2.play;
    }
    else if (rightv == 3) {
      text("Theme: Spooky", 550,300);
      filter (THRESHOLD);
      song3.play;
    }
    else if (rightv == 4) {
      text("Theme: Volcano", 550,300);
      fill(255,0,0,127);
      rect(0,0,1430,765);
      song4.play;
    }
    else if (rightv == 5) {
      text("Theme: Deep Sea", 550,300);
      fill(0,0,255,127);
      rect(0,0,1430,765);
      song5.play;
    }
    
    

 



      
  }
}