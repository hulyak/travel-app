!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){const{calculateTime:r}=n(1),{createTrip:a}=n(6),o=document.getElementById("error-text"),i=document.getElementById("trips");e.exports={formSubmitHandler:async e=>{console.log("DOM fully loaded and parsed.");const t=document.querySelector("#save-button");t.addEventListener("click",async e=>{e.preventDefault();const n=document.getElementById("city").value.trim(),c=document.getElementById("start-date").value,d=document.getElementById("end-date").value,l=new Date(c).getTime()/1e3,s=r(c,d);if(""==n||""==c||""==d)alert("Please enter a valid city and date!");else if("error"===s)return o.setAttribute("display","block"),o.textContent="Check the dates",void alert("Check the dates");o.textContent="",o.setAttribute("display","none");try{await(async(e,t,n,r)=>{const a={city:e,start_date:t,end_date:n,date:r};let o=await fetch("http://localhost:3000/trips",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({tripData:a})});try{return await o.json()}catch(e){console.log("error",e)}})(city,c,d,l).then(e=>{const n=a(e.city,e.startDate,e.endDate,s,e.weather,e.temp,e.cityImageUrl);i.appendChild(n),t.textContent="Save trip"})}catch(e){alert("Please try again!"),console.log(e)}})}}},function(e,t){const n=()=>{const e=new Date;return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},r=e=>new Date(e).getTime()/1e3,a=(e,t)=>{const n=new Date(e);return(new Date(t).getTime()-n.getTime())/864e5};e.exports={calculateTime:function(e,t){const o=n();return r(e)<r(o)||r(t)<=r(o)||r(t)<=r(e)?"error":a(e,t)}}},function(e,t,n){"use strict";n.r(t);n(3),n(4),n(5),n(1);var r=n(0);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);window.addEventListener("DOMContentLoaded",r.formSubmitHandler),document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#trips").style.display="none"})},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t){const n=(e,t,n)=>{const r=document.createElement("div");r.classList.add(e);const a=document.createElement("div");a.classList.add("trip-label"),a.textContent=t,r.appendChild(a);const o=document.createElement("div");return o.classList.add("trip-value"),o.innerHTML=n,r.appendChild(o),r};e.exports={createTrip:async(e,t,r,a,o,i,c)=>{const d=document.createElement("div");d.classList.add("trip");const l=document.createElement("img");l.setAttribute("src",c),d.appendChild(l);const s=n("destination-container","Destination: ",e);d.appendChild(s);const u=n("start-date-container","Departure date: ",t);d.appendChild(u);const p=n("end-date-container","Return Date: ",r);d.appendChild(p);const f=n("duration-container","Duration : ",a+" days away");d.appendChild(f);const m=n("weather-info-container","Weather will be like ",`${o} <br/> Temperature:${i}${String.fromCharCode(176)}C`);return d.appendChild(m),d}}}]);