

async function getbackground() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=6dzpteF2bXDR2HjVlGmkiy8kmTEYYUdf5hpRS0Ra";

    try{
        const response=await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);

        }

        const result=await response.json();
        console.log(result);

        if(result.media_type!=='image'){
            console.log("Non-image media type.");
            return null;
        }

        return result.url;

    } catch (error) {
        console.log(error.message);
        return null;
    }
}

window.onload=function(){
    clk();
    getbackground().then(function (imageUrl){
        if(!imageUrl) return;
        console.log(imageUrl);

        const backgroundElement = document.getElementById("background");

        if (background){
            background.style['background-image'] = `url('${imageUrl}')`;
        }
    });
};

function clk(){
    const timeElem=document.getElementById("time");
    if(!timeElem) return;

    setInterval(()=>{
        const dateObj=new Date();
        let ms=dateObj.getTime();
        const offsetms=dateObj.getTimezoneOffset()*60*1000;
        let localms=ms-offsetms;
        const dayMs=24*60*60*1000;
        let todayMs= localms% dayMs;
        let hrs=Math.floor(todayMs/(60*60*1000));
        let mins=Math.floor(todayMs%(60*60*1000)/(60*1000));
        let secs=Math.floor((todayMs%(60*1000))/1000);

        
        
        //adding 0 before single digit time(formatting)
        let fHrs=String(hrs).padStart(2,'0');
        let fMins=String(mins).padStart(2,'0');
        let fSecs=String(secs).padStart(2,'0');

        timeElem.innerText=`${fHrs}:${fMins}:${fSecs}`;
    },1000);
}