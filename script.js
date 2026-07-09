

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
    getbackground().then(function (imageUrl){
        if(!imageUrl) return;
        console.log(imageUrl);

        const backgroundElement = document.getElementById("background");

        if (background){
            background.style['background-image'] = `url('${imageUrl}')`;
        }
    });
};