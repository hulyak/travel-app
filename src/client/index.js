//Import the sass files into index.js
import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';
import './styles/todo.scss';

import {item} from './js/todo';
export * from './js/todo';

import { calculateTime } from "./js/calculateTime";
import { formSubmitHandler } from "./js/index";

window.addEventListener('DOMContentLoaded', formSubmitHandler);

document.querySelector("#reset").addEventListener('click', () => {
    document.querySelector("#trips").style.display ='none'
;})

export * from "./js/index";