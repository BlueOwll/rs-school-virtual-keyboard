/* eslint-disable linebreak-style */
/* eslint-disable indent */
// import {KeyButton} from './keyButton.js';
// eslint-disable-next-line import/extensions
import Keyboard from './keyboard.js';
// eslint-disable-next-line import/extensions
import TextBox from './textBox.js';

let appIsEngl = true;
let virtKeyboard;
let textBox;
let lang;

window.onload = function app() {
    if (localStorage.getItem('isEngl') !== null) {
        // console.log('isEngl ' + localStorage.getItem('isEngl'));
        appIsEngl = localStorage.getItem('isEngl') === 'true';
    } else {
        appIsEngl = true;
    }
    localStorage.setItem('isEngl', appIsEngl);

    // console.log('hello!');

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
    lang.innerHTML = (appIsEngl) ? 'ENG' : 'РУС';
    view.append(lang);

    virtKeyboard = new Keyboard(view, appIsEngl);

    const descr = document.createElement('p');
    descr.className = 'descr';
    descr.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe shift + ctrl';
    view.append(descr);

    // console.log(virtKeyboard.keys);

    addKeyboardEventsHandler();
    addVirtKeyBoardEventsHandler();
};

// const pressedKeys = [];
// let mousePressedKey = '';

function addKeyboardEventsHandler() {
    document.addEventListener('keydown', (ev) => {
        ev.preventDefault();
        // console.log('key = ', ev.key);
        // console.log('code = ', ev.code);
        // console.log('repeat = ', ev.repeat);

        if (!virtKeyboard.isPressed(ev.code)) {
            virtKeyboard.pressKey(ev.code);
            pressButtonHandler(ev.code);
        }
    });

    document.addEventListener('keyup', (ev) => {
        // console.log('realesedkey keyup begin ev listener');
        ev.preventDefault();
        // console.log('keyup ' + ev.code);
        releaseButtonHandler(ev.code);
    });
}
function pressButtonHandler(id) {
    const currVKey = virtKeyboard.findKeyById(id);
    if (!currVKey) {
        return;
    }
    virtKeyboard.pressKey(id);
    // currVKey.pressKey();
    // console.log('shift =' + currVKey.id);

    if (virtKeyboard.isPrintable(currVKey.id)) {
        textBox.setFocus();
        textBox.addChar(currVKey.content);
    } else {
        // console.log('unprintable');
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
                break;
        }
    }
}

function releaseButtonHandler(id) {
    // const currVKey = virtKeyboard.findKeyById(id);
    // console.log('pressedkeys' +' length = '+ pressedKeys.length);
    // console.log(pressedKeys);
    // const i = pressedKeys.indexOf(currVKey.id);

    if (!virtKeyboard.isPressed(id)) {
        return;
    }

    virtKeyboard.releaseKey(id);

    if (appIsEngl !== virtKeyboard.isEngl) {
        appIsEngl = virtKeyboard.isEngl;
        lang.innerHTML = (appIsEngl) ? 'ENG' : 'РУС';
        localStorage.setItem('isEngl', appIsEngl);
    }
}

function addVirtKeyBoardEventsHandler() {
    let mousePressedKey = '';
    virtKeyboard.node.addEventListener('mousedown', (ev) => {
        // console.log('mousedown');
        const currKeyElement = ev.target.closest('.keyButton');
        if (!currKeyElement) {
            return;
        }
        if (mousePressedKey) {
            virtKeyboard.releaseKey(mousePressedKey);
        }
        mousePressedKey = currKeyElement.getAttribute('data-id');
        virtKeyboard.pressKey(mousePressedKey);
        pressButtonHandler(mousePressedKey);
    });
    virtKeyboard.node.addEventListener('mouseup', (ev) => {
        // console.log('mouseup');
        let mouseId;
        const currKeyElement = ev.target.closest('.keyButton');
        if (!currKeyElement || (mousePressedKey !== currKeyElement.getAttribute('data-id'))) {
            virtKeyboard.releaseKey(mousePressedKey);
            mouseId = mousePressedKey;
        } else {
            mouseId = currKeyElement.getAttribute('data-id');
        }
        mousePressedKey = '';
        releaseButtonHandler(mouseId);
    });
}
