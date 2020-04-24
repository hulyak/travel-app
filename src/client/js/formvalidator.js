export function onCreate()
{
    const place=document.getElementById('city').value.trim();
    const date=document.getElementById('start-date').value;
    if(place=='')
    {
        document.getElementById('city').style.cssText="border:1px solid red";
        alert("Please enter a place name");
    }
    if(date.length === 0)
    {
        document.getElementById('start-date').style.cssText="border:1px solid red";
        alert("Please enter a date");
    }
   if(! isDateValid(date))
   {
    document.getElementById('start-date').style.cssText="border:1px solid red";
    alert("Select an appropriate date");
   } 
   else {
    callGeoNameApi(place,date);
   }
}


function isDateValid(date1)
{
    let d = new Date();
    let date=new Date(date1);
    if(date < d)
    {
    return false;
    }
    return true;
}
function callGeoNameApi(place,date)
{
    const baseUrl="http://api.geonames.org/geoCodeAddressJSON?q=";
    const username="hulya";
    fetchLatLang(place,baseUrl,username).then(function(data){
        const baseUrl="https://api.weatherbit.io/v2.0/forecast/daily?";
        const keyweatherapi='04fa6da2d39e4f31b3d25b6d75ad1c84';

        getWeatherData(baseUrl,keyweatherapi,data,date).then(function(wdata)
        {
            postDataToServer('http://localhost:3000/weatherdata',{weather:wdata,dateT:date,cityname:place}).then(
                function(serverData)
                {
                    getDataFromServer('http://localhost:3000/getWeather').then(function(getData)
                    {
                        updateUI(getData);
                    });
                }
            );
        });
    });
}
const fetchLatLang=async (place,baseUrl,username)=>
{
    let coord={
        lang:'',
        lat:'',
    };
    const response=await fetch(`${baseUrl}${place}&username=${username}`);
    try{
    const data=await response.json();
    coord['lng']=data['address']['lng'];
    coord['lat']=data['address']['lat'];
    return coord;}
    catch(error)
    {
        document.getElementById('city').style.cssText="border:1px solid red";
        document.getElementById('nameerror').innerHTML="Sorry, try again!";
    }  
}

/* Post data to the server */
const postDataToServer=async(baseUrl='',data={})=>
{
    const response=await fetch(baseUrl,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData=await response.json();
        return newData;
    }
    catch(error)
    {
        console.log("error:"+error);
    }
}

const deleteTrip = async (baseUrl = '', index) =>{
    let dlt = confirm(`Delete this trip?`);
    if(dlt === false) return;
    try {
        await fetch(baseUrl, {
            method:"DELETE",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id:index})
        });
        await updateUI();
    }catch (e){
        console.log(e);
    }
}
//To fetch data from the weather api

const getWeatherData=async(baseUrl,key,data,date)=>
{
    const response=await fetch(`${baseUrl}lat=${data['lat']}&lon=${data['lng']}&key=${key}`);
    try{
        const dataWeather=await response.json();
        console.log(dataWeather);
        return dataWeather;
    }
    catch(error)
    {
        console.log(error);
    }
}

//To get the data saved on the server

const getDataFromServer=async (baseurl)=>
{
    const weatherdata=await fetch(baseurl);
    try{
        const getData=weatherdata.json();
        return getData;
    }
    catch(error)
    {
        console.log("server error"+error);
    }
}
function updateUI(getData)
{
    const pixaUrl="https://pixabay.com/api/?key=";
    const key='16060501-e2d3132e99ce2be48e2344f5f';
    getPixaBayImages(pixaUrl,key,getData);
    
}

const getPixaBayImages=async (url,key,getData)=>
{
    const length=getData['length']-1;
    console.log(getData['length']);
    const response=await fetch(`${url}${key}&q=${getData[length]['cityname']}+city&image_type=photo`);
     try{
    const image1=await response.json();
    Client.updateInterface(getData,image1);
    }
    catch(error)
    {
        console.log(error);
    }
}

const submit=document.getElementById('submit');
submit.addEventListener('click',onCreate);
submit.addEventListener('onmousedown',onCreate);
export {deleteTrip};