//Import the sass files into index.js
import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';
import './styles/todo.scss';

// import './js/todo.js';
import item from './js/todo';
import check from './js/todo';
// import './views/index.html';

// import sky from './media/sky.jpg';

import { calculateTime } from "./js/calculateTime";
import { formSubmitHandler } from "./js/index";

window.addEventListener('DomContentLoaded', formSubmitHandler);
// const saveBtn = document.getElementById("save-button");

// saveBtn.addEventListener("click", formSubmitHandler);

document.querySelector("#reset").addEventListener('click', () => {
    document.querySelector("#trips").style.display ='none'
;})

export * from "./js/index";