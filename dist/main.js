!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){const{calculateTime:r}=n(2),{createTrip:o}=n(9),a=document.getElementById("city"),i=document.getElementById("start-date"),d=document.getElementById("end-date"),c=document.getElementById("error-text"),l=document.getElementById("trips");e.exports={formSubmitHandler:async e=>{console.log("DOM fully loaded and parsed.");const t=document.querySelector("#save-button");t.addEventListener("click",async e=>{e.preventDefault();const n=a.value.trim(),s=i.value,u=d.value,p=new Date(s).getTime()/1e3,m=r(s,u);if(""==n||""==s||""==u)alert("Please enter a valid city and date!");else if("error"===m)return c.setAttribute("display","block"),void(c.textContent="Check the dates");c.textContent="",c.setAttribute("display","none");try{await(async(e,t,n,r)=>{const o={city:e,start_date:t,end_date:n,date:r};let a=await fetch("http://localhost:3000/trips",{method:"POST",mode:"cors",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({tripData:o})});try{return await a.json()}catch(e){console.log("error",e)}})(n,s,u,p).then(e=>{const n=o(e.city,e.startDate,e.endDate,m,e.weather,e.temp,e.timezone,e.cityImageUrl);l.appendChild(n),t.textContent="Save trip"})}catch(e){document.querySelector("#trips").innerText="Please try again!",console.log(e)}})}}},function(e,t,n){"use strict";(function(e){const t=document.querySelector(".container"),n=document.querySelector(".input"),r=document.querySelector(".add");if(null==window.localStorage.getItem("todos")){var o=[];window.localStorage.setItem("todos",JSON.stringify(o))}var a=window.localStorage.getItem("todos");o=JSON.parse(a);class i{constructor(e){this.createItem(e)}createItem(e){const n=document.createElement("div");n.classList.add("item");const r=document.createElement("input");r.type="text",r.disabled=!0,r.value=e,r.classList.add("item_input");const o=document.createElement("button");o.classList.add("edit"),o.innerHTML="EDIT",o.addEventListener("click",()=>this.edit(r,e));const a=document.createElement("button");a.classList.add("remove"),a.innerHTML="REMOVE",a.addEventListener("click",()=>this.remove(n,e)),t.appendChild(n),n.appendChild(r),n.appendChild(o),n.appendChild(a)}edit(e,t){if(1==e.disabled)e.disabled=!e.disabled;else{e.disabled=!e.disabled;let n=o.indexOf(t);o[n]=e.value,window.localStorage.setItem("todos",JSON.stringify(o))}}remove(e,t){e.parentNode.removeChild(e);let n=o.indexOf(t);o.splice(n,1),window.localStorage.setItem("todos",JSON.stringify(o))}}function d(){""!=n.value&&(new i(n.value),o.push(n.value),window.localStorage.setItem("todos",JSON.stringify(o)),n.value="")}r.addEventListener("click",d),window.addEventListener("keydown",e=>{13==e.which&&d()});for(let e=0;e<o.length;e++)new i(o[e]);new i("buy tickets"),e.exports={check:d}}).call(this,n(8)(e))},function(e,t){const n=()=>{const e=new Date;return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},r=e=>new Date(e).getTime()/1e3,o=(e,t)=>{const n=new Date(e);return(new Date(t).getTime()-n.getTime())/864e5};e.exports={calculateTime:function(e,t){const a=n();return r(e)<r(a)||r(t)<=r(a)||r(t)<=r(e)?"error":o(e,t)}}},function(e,t,n){"use strict";n.r(t);n(4),n(5),n(6),n(7),n(1),n(2);var r=n(0);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);window.addEventListener("DOMContentLoaded",r.formSubmitHandler),document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#trips").style.display="none"})},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t){const n=(e,t,n)=>{const r=document.createElement("div");r.classList.add(e);const o=document.createElement("div");o.classList.add("trip-label"),o.textContent=t,r.appendChild(o);const a=document.createElement("div");return a.classList.add("trip-value"),a.innerHTML=n,r.appendChild(a),r};e.exports={createTrip:async(e,t,r,o,a,i,d)=>{const c=document.createElement("div");c.classList.add("trip");const l=document.createElement("img");l.setAttribute("src",d),c.appendChild(l);const s=n("destination-container","Destination: ",e);c.appendChild(s);const u=n("start-date-container","Departure date: ",t);c.appendChild(u);const p=n("end-date-container","Return Date: ",r);c.appendChild(p);const m=n("duration-container","Duration : ",o+" days away");c.appendChild(m);const f=n("weather-info-container","Weather will be like ",`${weather_summary} <br/> Temperature:${i}${String.fromCharCode(176)}C`);return c.appendChild(f),c}}}]);