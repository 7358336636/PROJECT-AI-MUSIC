song="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;
score_leftWrist=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotResult);
}

function draw(){
    image(video,0,0,600,500);

    fill("#ff0000");
    stroke("#ff0000");
    circle(leftWrist_x, leftWrist_y, 20);

    InNumberleftWristY=Number(leftWrist_y);
    remove_decimal=floor(InNumberleftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="Volume = " + volume;
    song.setVolume(volume);
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("Posenet is initialized");
}

function gotResult(results){
    if(results.length>0){
        console.log(results);
        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        console.log("leftWrist_x= "+leftWrist_x+" leftWrist_y= "+leftWrist_y);

        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("rightWrist_x="+rightWrist_x+" rightWrist_y= "+rightWrist_y);

        score_leftWrist=results[0].pose.keypoints[9].score;
    }
}