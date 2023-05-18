song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist=0;
scorerightWrist=0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill('#c90000');
    stroke('#0f089c');
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        isNumberleftWristY = Number(leftWristY);
        removeDecimals = floor(isNumberleftWristY);
        leftWristY_divide_100 = removeDecimals / 1000;
        volume = leftWristY_divide_100 * 2;
        document.getElementById("volume").innerHTML = "Volume " + volume;
        song.setVolume(volume);
    }
    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY>=100){
           document.getElementById("speed").innerHTML= "Speed = 0.5x";
           song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
           document.getElementById("speed").innerHTML="Speed = 1x";
           song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
           document.getElementById("speed").innerHTML="Speed = 1.5x";
           song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
           document.getElementById("speed").innerHTML="Speed = 2x";
           song.rate(2);
        }
        else if(rightWristY>400 &&rightWristY<=500){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }

    }
    



}
function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
    document.getElementById("button1").style.display = "none";
    document.getElementById("button2").style.display = "block";
}
function modalLoaded() {
    console.log("Posenet is inittialized");
}
function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        scoreleftWrist=result[0].pose.keypoints[9].score;
        scorerightWrist=result[0].pose.keypoints[10].score;
        console.log(" leftWristX = " + leftWristX + "leftwristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }


}
function stop() {
    song.stop();
    document.getElementById("button2").style.display = "none";
    document.getElementById("button1").style.display = "block";
}