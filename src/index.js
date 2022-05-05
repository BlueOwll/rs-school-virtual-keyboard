import {KeyButton} from './keyButton.js';
import {Keyboard} from './keyboard.js';

let isEngl = true;
const keysLettersEng = 'qwertyuiopasdfghjklzxcvbnm'.split('');
const keysLettersRus = 'йцукенгшщзхъфывапролджэячсмитьбю'.split('');
const keysDigits = '1234567890'.split('');

window.onload = function(){
    console.log('hello!');
    renderView();


}

const renderView = function(){
    let keys = [];
    const view = document.createElement('div');
    view.className = 'view';
    document.body.append(view);
    /*keysLettersEng.map(v =>{
        const key = new KeyButton(view, v);
        keys.push(key);    
    }) */
    const keyboard = new Keyboard(view,isEngl);
    console.log(keys);
}