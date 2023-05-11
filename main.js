video=""
status_model=""
object=""
function preload(){
    video=createVideo("video.mp4")
    video.hide()
}
function setup(){
    canvas=createCanvas(500,500)
    canvas.position(520,210)
    
 
}
function draw(){
    image(video,0,0,500,500)
    if(status_model != ""){
        objectdetector.detect(video,gotresult)
        document.getElementById("status").innerHTML= "Status = Object/s Detected"
        document.getElementById("objects").innerHTML= "No. of Objects = "+ object.length

        for(i=0; i<object.length;i++){
            stroke("red")
            noFill()
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            confidence=Math.floor((object[i].confidence)*100)
            text(object[i].label+" "+confidence+"%",object[i].x,object[i].y)

        }
    }
}
function start(){
objectdetector= ml5.objectDetector("cocossd",modelLoaded)
}
function modelLoaded(){
    console.log("Model is loaded")
    document.getElementById("status").innerHTML= "Status= Detecting Objects"
    status_model="true"
    video.loop()
    video.speed(1)
    video.volume(0)
}
function gotresult(error,result){
if(error){
    console.log(error)
}
else{
    console.log(result)
    object=result
    
}
}