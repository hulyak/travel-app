//Import the sass files into index.js
import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';
import './styles/todo.scss';

import './js/todo.js';
import './views/index.html';

import sky from './media/sky.jpg';

import { calculateTime } from "./js/calculateTime";
import { formSubmitHandler } from "./js/index";

const saveBtn = document.getElementById("save-button");

saveBtn.addEventListener("click", formSubmitHandler);

export * from "./js/index";