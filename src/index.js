/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// import {KeyButton} from './keyButton.js';
// eslint-disable-next-line import/extensions
import Keyboard from './keyboard.js';

let isEngl = true;
let virtKeyboard;

window.onload = function () {
    if (localStorage.getItem('isEngl') !== null) {
        console.log('isEngl ' + localStorage.getItem('isEngl'));
        isEngl = localStorage.getItem('isEngl') === 'true';
    } else {
        isEngl = true;
    }
    localStorage.setItem('isEngl', isEngl);

    console.log('hello!');

    const view = document.createElement('div');
    view.className = 'view';
    document.body.append(view);

    virtKeyboard = new Keyboard(view, isEngl);

    console.log(virtKeyboard.keys);

    addKeyboardEventsHandler();
    addVirtKeyBoardEventsHandler();
};
const pressedKeys = [];
let mousePressedKey = null;

const addKeyboardEventsHandler = function () {
    document.addEventListener('keydown', (ev) => {
        ev.preventDefault();
        console.log('key = ', ev.key);
        console.log('code = ', ev.code);
        if (!ev.repeat) {
            pressedKeys.push(ev.code);
        }
        pressButtonHandler(ev.code);

        // -TODO  print simbol
    });

    document.addEventListener('keyup', (ev) => {
        ev.preventDefault();
        releaseButtonHandler(ev.code);
    });
};
const pressButtonHandler = function (id) {
    const currVKey = virtKeyboard.findKeyById(id);
        
        console.log(pressedKeys);
        if (currVKey) {
            currVKey.pressKey();
        }
        if (currVKey.id === 'CapsLock') {
            virtKeyboard.pressedCapsLock();
            if (!virtKeyboard.isCapsLock) {
                currVKey.releaseKey();
            }
            console.log('cAPSLOCK DOWN');
        }
        if (currVKey.id.includes('Shift')) {
            virtKeyboard.pressedShift();
        }
        console.log('pressedkes = ' + pressedKeys);
};

const releaseButtonHandler = function (id) {
    const currVKey = virtKeyboard.findKeyById(id);
        const i = pressedKeys.indexOf(currVKey.id);
        console.log('released key ' + id);
        if ((id === 'ShiftLeft') || (id === 'ControlLeft')) {
            console.log('step 1 ' +id);
            if((pressedKeys.includes('ShiftLeft')) && (pressedKeys.includes('ControlLeft'))) {
        // if (((id === 'ShiftLeft') && (pressedKeys.includes('ControlLeft'))) || 
        // ((id === 'ControlLeft') && (pressedKeys.includes('ShiftLeft')))) { 
            console.log('step 2 ' +id);
            isEngl = !isEngl;
            virtKeyboard.changeLayout(isEngl);
            localStorage.setItem('isEngl', isEngl);
            console.log('is engl ' + isEngl);
            }
        }
        if (!(i === -1)) {
            pressedKeys.splice(i, 1);
            // console.log('pressedkes = ' + pressedKeys);
            if (currVKey.id === 'CapsLock') {
                return;
            }
            if (currVKey.id.includes('Shift')) {
                virtKeyboard.releaseShift();
            }
            currVKey.releaseKey();
        }
        console.log('pressedkes = ' + pressedKeys);
};

const addVirtKeyBoardEventsHandler = function () {
    virtKeyboard.node.addEventListener('mousedown', (ev) => {
        console.log('mousedown');
        const currKeyElement = ev.target.closest('.keyButton');
        mousePressedKey = currKeyElement.getAttribute('data-id');
        if (!currKeyElement) {
            return;
        }
        pressButtonHandler(currKeyElement.getAttribute('data-id'));
    });
    virtKeyboard.node.addEventListener('mouseup', (ev) => {
        console.log('mouseup');
        const currKeyElement = ev.target.closest('.keyButton');
        if (mousePressedKey && (mousePressedKey !== 'CapsLock')) {
            virtKeyboard.findKeyById(mousePressedKey).releaseKey();
        }
        if (!currKeyElement) {
            return;
        }
        releaseButtonHandler(currKeyElement.getAttribute('data-id'));
    });
};
