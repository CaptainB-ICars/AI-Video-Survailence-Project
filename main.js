
object=[]


function setup()
{
    canvas=createCanvas(380,380)
    canvas.center()
    video=createCapture(VIDEO)
    video.size(380,380)
    video.hide()
}

function draw()
{
    image(video,0,0,380,380)
    if(status!="")
    {
        objectDetector.detect(video,gotResult)
        for(i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected"
            document.getElementById("NOB").innerHTML="Number Of Objects Detected Are: "+object.length
            fill("black")
            percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15)
            noFill()
            stroke("black")
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
        }
    }


}

function gotResult(error,result)
{
    if(error)
    {
        console.error(error)
    }
    else
    {
        console.log(result)
        object=result
    }
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"
    object_name=document.getElementById("object_name").value
}

function modelLoaded()
{
    console.log("model is loaded")
    status=true
    video.loop()
    video.speed(1)
}