var Client=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t),n.d(t,"onCreate",(function(){return o})),n.d(t,"updateInterface",(function(){return u}));n(0),n(1),n(2);var r=n.p+"images/b9d0f2cb1f9c21627f77f0e45c99fded-notrip.webp";function o(e){e.preventDefault();const t=document.getElementById("city").value.trim(),n=document.getElementById("date").value;""==t&&(t.style.cssText="border:1px solid red",alert("Please enter a place name")),0===n.length&&(n.style.cssText="border:1px solid red",alert("Please enter a date")),function(e){let t=new Date;if(new Date(e)<t)return!1;return!0}(n)?function(e,t){a(e,"http://api.geonames.org/geoCodeAddressJSON?q=","hulya").then((function(n){i("https://api.weatherbit.io/v2.0/forecast/daily?","04fa6da2d39e4f31b3d25b6d75ad1c84",n,t).then((function(n){c("http://localhost:3000/weatherdata",{weather:n,dateT:t,cityname:e}).then((function(e){d("http://localhost:3000/getWeather").then((function(e){!function(e){l("https://pixabay.com/api/?key=","16060501-e2d3132e99ce2be48e2344f5f",e)}(e)}))}))}))}))}(t,n):(document.getElementById("date").style.cssText="border:1px solid red",alert("select appropriate date"))}const a=async(e,t,n)=>{let r={lang:"",lat:""};const o=await fetch(`${t}${e}&username=${n}`);try{const e=await o.json();return r.lng=e.address.lng,r.lat=e.address.lat,r}catch(e){document.getElementById("city").style.cssText="border:1px solid red",alert("Sorry, try again!")}},c=async(e="",t={})=>{const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{return await n.json()}catch(e){console.log("error:"+e)}},i=async(e,t,n,r)=>{const o=await fetch(`${e}lat=${n.lat}&lon=${n.lng}&key=${t}`);try{const e=await o.json();return console.log(e),e}catch(e){console.log(e)}},d=async e=>{const t=await fetch(e);try{return t.json()}catch(e){console.log("server error"+e)}};const l=async(e,t,n)=>{const r=n.length-1;console.log(n.length);const o=await fetch(`${e}${t}&q=${n[r].cityname}+city&image_type=photo`);try{const e=await o.json();Client.updateInterface(n,e)}catch(e){console.log(e)}},s=document.getElementById("submit");function u(e,t){const n=e.length-1,r=document.querySelector(".notrip"),o=document.getElementById("mainimage"),a=document.getElementById("cityname"),c=(document.getElementById("temperature"),e[n].date);a.innerHTML="Destination: "+e[n].cityname;for(let a=0;a<15;a++)c==e[0].weather.data[a].datetime&&(r.style.display="none",document.getElementById("dateoftravel").innerHTML="Travel Date: "+c,o.setAttribute("src",t.hits[0].webformatURL),o.style.display="block",document.getElementById("min-temp").innerHTML="Minimum Temp: "+e[n].weather.data[a].min_temp,document.getElementById("max-temp").innerHTML="Maximum Temp:"+e[n].weather.data[a].max_temp,document.getElementById("desc").innerHTML="Weather Conditon :"+e[n].weather.data[a].weather.description,document.querySelector(".trip-data").style.textCss="display:block; color: white; width: 50%; border-radius: 1rem;padding:1rem;box-shadow: 2px 2px lightgray;margin: auto auto")}s.addEventListener("click",o),s.addEventListener("onmousedown",o),document.getElementById("notripi").src=r}]);