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


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);


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
  filter(THRESHOLD,1);    
  strokeWeight(2);

  
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

    const leftWrist = pose.leftWrist;
    const rightWrist = pose.rightWrist;
    const leftAnkle = pose.leftAnkle;
    const rightAnkle = pose.rightAnkle;
    const nose = pose.nose;

    fill(leftWrist.x, 0, leftWrist.x);
    rect(leftWrist.x, leftWrist.y, 100, 100);
    fill(rightWrist.x, rightWrist.x, 0);
    rect(rightWrist.x, rightWrist.y, 100, 100);
    fill(rightAnkle.x, rightAnkle.x, 0);
    rect(leftAnkle.x, leftAnkle.y, 100, 100);
    fill(leftAnkle.x, 100, 0);
    rect(rightAnkle.x, rightAnkle.y, 100, 100);
    fill(rightWrist.x, rightWrist.x, 0);
    rect(nose.x, nose.y, 100, 100);


 



      
  }
}