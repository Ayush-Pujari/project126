
song1=""
song2=""
scoreleftWrist=0;
scorerightWrist=0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload(){
   song1=loadSound("music.mp3");
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
    circle(rightWristX,rightWristY,20);
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song.stop(song2)
        if(song1==false){
            song.play(song1);
            document.getElementById("sname").innerHTML=" Peter pan ";
        }

    }
    if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song.stop(song1)
        if(song==false){
            song.play(song2);
            document.getElementById("sname").innerHTML=" Harry Potter song";
        }

    }

 


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
          scoreleftWrist=result[0].pose.keypoints[9].score;
          scorerightWrist=result[0].pose.keypoints[10].score;
          console.log(" leftWristX = "+leftWristX+ "leftwristY = "+leftWristY);
          console.log("rightWristX = "+ rightWristX+"rightWristY = "+ rightWristY);
      }
  
      
  }
