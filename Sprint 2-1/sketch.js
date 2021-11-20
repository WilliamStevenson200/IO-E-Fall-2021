// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
Baseball Pitcher code
=== */

let video;
let poseNet;
let poses = [];
let d;
let img;
let img2;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);


  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
  // Loads in images used in the ../images folder
  img = loadImage('images/baseball.png');
  img2 = loadImage('images/glove.png');
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
    const leftEye = pose.leftEye;
    const rightEye = pose.rightEye;
 // Loads
    image(img, leftWrist.x, leftWrist.y, d*4, d*4);
    image(img2, rightWrist.x, rightWrist.y, d*5, d*5);

    d = dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);



      
  }
}