export function onInputFocus(x,id)
{
    x.style.cssText="border:2px solid green; outline:none";
    if(id=='placetogo')
    {
        document.getElementById('nameerror').innerHTML="";
    }
    if(id=='dateid')
    {
        document.getElementById('dateerror').innerHTML="";
    }
}
export function onBlurInput(x,id)
{
    x.style.cssText="border:1px solid white;";
    const value=x.value;
    if(value=="")
    {
        if(id=='placetogo')
        {
            x.style.cssText="border:1px solid red";
            document.getElementById('nameerror').innerHTML="Enter a city name";
        }
        if(id=='dateid')
            x.style.cssText="border:1px solid red";
            document.getElementById('dateerror').innerHTML="Select a date to travel";
        }
    
    if(id=='dateid')
    {
        {   
            let d = new Date();
            let date=new Date(value);
            if(date<d)
            {
            x.style.cssText="border:1px solid red";
            document.getElementById('dateerror').innerHTML="select appropriate date";
        }
        
    }
}}