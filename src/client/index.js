//Import the sass files into index.js
import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';

import notrip from './media/notrip.jpeg'
import { onCreate } from './js/formvalidator'
import { onBlurInput } from './js/createButton'
import { onInputFocus } from './js/createButton';
import { updateInterface } from './js/updateDataOnPage'; 

export
{
    onCreate,
    onBlurInput,
    onInputFocus,
    updateInterface
}

const notripimg=document.getElementById('notripi');
notripimg.src=notrip;