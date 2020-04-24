import {deleteTrip} from './formvalidator';

const updateInterface = async (getData,imageUrl) => {
try{
    let response = await fetch(baseUrl);
    let data = await response.json();

    const length=getData['length']-1;
    const mainImage=document.getElementById('mainimage');
    const cityName=document.getElementById('cityname');
    const temp=document.getElementById('temperature');
    const date=getData[length]['date']
    cityName.innerHTML="Destination: "+getData[length]['cityname'];
    for(let i=0;i<15;i++)
    {
        if(date==getData[0]['weather']['data'][i]['datetime'])
        {
            document.getElementById('dateoftravel').innerHTML="Date: "+date;
            mainImage.setAttribute('src',imageUrl.hits[0].webformatURL);
            mainImage.style.display='block';
            document.getElementById('min-temp').innerHTML="Minimum Temp: "+getData[length]['weather']['data'][i]['min_temp'];
            document.getElementById('max-temp').innerHTML="Maximum Temp:"+getData[length]['weather']['data'][i]['max_temp'];
            document.getElementById('desc').innerHTML="Weather Conditon :"+getData[length]['weather']['data'][i]['weather']['description'];
            document.querySelector('.trip-data').style.textCss='display:block; color: white; width: 50%; border-radius: 1rem;padding:1rem;box-shadow: 2px 2px lightgray;margin: auto auto';
            
            }
        }
    await document.querySelectorAll('.delete-button').forEach((btn, index) => {
        btn.addEventListener('click', e => {
            deleteTrip(baseUrl, index);
        });
    });
}
catch(e){
    console.log(e);
}
}

export {updateInterface};