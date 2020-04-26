//Import the sass files into index.js
import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';

import notrip from './media/notrip.webp';
import {
    onCreate
} from './js/formvalidator';
import {
    updateInterface
} from './js/updateDataOnPage';

export {
    onCreate,
    updateInterface
}

const notripimg = document.getElementById('notripi');
notripimg.src = notrip;