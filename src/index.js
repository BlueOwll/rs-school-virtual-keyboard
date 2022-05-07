/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// import {KeyButton} from './keyButton.js';
// eslint-disable-next-line import/extensions
import Keyboard from './keyboard.js';
// eslint-disable-next-line import/extensions
import TextBox from './textBox.js';

let isEngl = true;
let virtKeyboard;
let textBox;
let lang;

window.onload = function () {
    if (localStorage.getItem('isEngl') !== null) {
        // console.log('isEngl ' + localStorage.getItem('isEngl'));
        isEngl = localStorage.getItem('isEngl') === 'true';
    } else {
        isEngl = true;
    }
    localStorage.setItem('isEngl', isEngl);

    console.log('hello!');

    const view = document.createElement('div');
    view.className = 'view';
    document.body.append(view);

    textBox = new TextBox(view);

    const langLabel = document.createElement('span');
    langLabel.className = 'descr';
    langLabel.innerHTML = 'Текущая раскладка:    ';
    view.append(langLabel);

    lang = document.createElement('span');
    lang.className = 'lang';
    lang.innerHTML = (isEngl) ? 'ENG' : 'РУС';
    view.append(lang);

    virtKeyboard = new Keyboard(view, isEngl);

    const descr = document.createElement('p');
    descr.className = 'descr';
    descr.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe shift + ctrl';
    view.append(descr);

    console.log(virtKeyboard.keys);

    addKeyboardEventsHandler();
    addVirtKeyBoardEventsHandler();
};
const pressedKeys = [];
let mousePressedKey = '';

const addKeyboardEventsHandler = function () {
    document.addEventListener('keydown', (ev) => {
        ev.preventDefault();
        console.log('key = ', ev.key);
        console.log('code = ', ev.code);
        console.log('repeat = ', ev.repeat);
        if (!ev.repeat) {
            pressedKeys.push(ev.code);
            // console.log('added ' + ev.code);
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
    if (currVKey) {
        currVKey.pressKey();
    }
    if (currVKey.id === 'CapsLock') {
        virtKeyboard.pressedCapsLock();
        if (!virtKeyboard.isCapsLock) {
            currVKey.releaseKey();
        }
    }
    // console.log('shift =' + currVKey.id);
    if (currVKey.id.includes('Shift')) {
        console.log('includes shift down');
        virtKeyboard.pressedShift();
    }
    textBox.setFocus();
    if (virtKeyboard.isPrintable(currVKey.id)) {
        textBox.addChar(currVKey.content);
    } else {
        switch (currVKey.id) {
            case 'Tab':
                textBox.addChar(' ');
                textBox.addChar(' ');
                textBox.addChar(' ');
                textBox.addChar(' ');
                break;
            case 'Backspace':
                textBox.delete(-1);
                break;
            case 'Delete':
                textBox.delete(1);
                break;
            case 'Enter':
                textBox.enter();
                break;
            case 'ArrowLeft':
                textBox.moveHoriz(-1);
                break;
            case 'ArrowRight':
                textBox.moveHoriz(1);
                break;
            case 'ArrowUp':
                textBox.moveVert(-1);
                break;
            case 'ArrowDown':
                textBox.moveVert(1);
                break;
            default:
        }
    }
};

const releaseButtonHandler = function (id) {
    const currVKey = virtKeyboard.findKeyById(id);
    const i = pressedKeys.indexOf(currVKey.id);
    if ((id === 'ShiftLeft') || (id === 'ControlLeft')) {
        if ((pressedKeys.includes('ShiftLeft')) && (pressedKeys.includes('ControlLeft'))) {
            isEngl = !isEngl;
            virtKeyboard.changeLayout(isEngl);
            lang.innerHTML = (isEngl) ? 'ENG' : 'РУС';
            localStorage.setItem('isEngl', isEngl);
        }
    }
    // console.log(pressedKeys);
    // console.log('shift up =' + currVKey.id +' i = '+ i);
    if (!(i === -1)) {
        pressedKeys.splice(i, 1);
        if (currVKey.id === 'CapsLock') {
            return;
        }
        if (currVKey.id.includes('Shift')) {
            console.log('includes shift up');
            virtKeyboard.releaseShift();
        }
        currVKey.releaseKey();
    } else {
        const k = pressedKeys.includes(mousePressedKey);
        if (k !== -1) {
            pressedKeys.splice(k, 1);
            mousePressedKey = '';
        }
    }
};

const addVirtKeyBoardEventsHandler = function () {
    virtKeyboard.node.addEventListener('mousedown', (ev) => {
        console.log('mousedown');
        const currKeyElement = ev.target.closest('.keyButton');
        if (!currKeyElement) {
            return;
        }
        mousePressedKey = currKeyElement.getAttribute('data-id');
        pressedKeys.push(mousePressedKey);
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
