
song=""
song2=""
function preload(){
   song=loadSound("music.mp3");
   song2=loadSound("music2.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
}
function modalLoaded(){
    console.log("Posenet is inittialized");
  }
  function gotPoses(result){
      if(result.length > 0){
          console.log(result);
          leftWristX=result[0].pose.leftWrist.x;
          leftWristY=result[0].pose.leftWrist.y;
          rightWristX=result[0].pose.rightWrist.x;
          rightWristY=result[0].pose.rightWrist.y;
          console.log(" leftWristX = "+leftWristX+ "leftwristY = "+leftWristY);
          console.log("rightWristX = "+ rightWristX+"rightWristY = "+ rightWristY);
      }
  
      
  }
