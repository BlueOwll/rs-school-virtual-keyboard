/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import KeyButton from './keyButton.js';

const keysLettersEngLow = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ ".split('');
const keysLettersEngUp = '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? '.split(''); // when capslock symbols and digits like in low
const keysLettersRusLow = 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю. '.split('');
const keysLettersRusUp = 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ, '.split(''); // when capslock symbols and digits like in low
// const ctrlKeysLeg = ['BackSpace','Del', 'Tab','CapsLock','Enter','Shift','Shift','Ctrl','Win']

export default class Keyboard {
    keys;

    _kb;

    _legend;

    _keyPressed;

    constructor(parentNode, isEngl) {
        this.keys = [];
        this._printedKeyNums = [];
        this._legend = [];
        this.isCapsLock = false;
        this.isShift = false;
        this.isEngl = isEngl;
        this._pressedKeys = [];

        this._kb = document.createElement('div');
        this._kb.className = 'keyboard';
        if (parentNode) {
            parentNode.append(this._kb);
        }
        this.node = this._kb;

        const row1 = document.createElement('div');
        row1.className = 'keyboard-row';
        // console.log('under construction');

        this.keys.push(new KeyButton(row1, '', '', 'Backquote'));
        this._printedKeyNums.push(this.keys.length - 1);
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < 10; i++) {
            this.keys.push(new KeyButton(row1, '', '', `Digit${i}`));
            this._printedKeyNums.push(this.keys.length - 1);
        }
        this.keys.push(new KeyButton(row1, '', '', 'Digit0'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row1, '', '', 'Minus'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row1, '', '', 'Equal'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row1, 'Backspace', 'double-size'));
        // console.log(this.keys);
        this._kb.append(row1);

        const row2 = document.createElement('div');
        row2.className = 'keyboard-row';
        // console.log('under construction2');
        this.keys.push(new KeyButton(row2, 'Tab', 'tab-size'));
        for (let i = 0; i < 10; i++) {
            this.keys.push(new KeyButton(row2, '', '', `Key${keysLettersEngUp[i + 13]}`));
            this._printedKeyNums.push(this.keys.length - 1);
        }
        this.keys.push(new KeyButton(row2, '', '', 'BracketLeft'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row2, '', '', 'BracketRight'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row2, '', '', 'Backslash'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row2, 'Del', 'tab-size', 'Delete'));
        // console.log(this.keys);
        this._kb.append(row2);

        const row3 = document.createElement('div');
        row3.className = 'keyboard-row';
        // console.log('under construction3');
        this.keys.push(new KeyButton(row3, 'CapsLock', 'double-size'));
        for (let i = 0; i < 9; i++) {
            this.keys.push(new KeyButton(row3, '', '', `Key${keysLettersEngUp[i + 26]}`));
            this._printedKeyNums.push(this.keys.length - 1);
        }
        this.keys.push(new KeyButton(row3, '', '', 'Semicolon'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row3, '', '', 'Quote'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row3, 'Enter', 'double-size'));
        // console.log(this.keys);
        this._kb.append(row3);

        const row4 = document.createElement('div');
        row4.className = 'keyboard-row';
        // console.log('under construction4');
        this.keys.push(new KeyButton(row4, 'Shift', 'double-size', 'ShiftLeft'));
        for (let i = 0; i < 7; i++) {
            this.keys.push(new KeyButton(row4, '', '', `Key${keysLettersEngUp[i + 37]}`));
            this._printedKeyNums.push(this.keys.length - 1);
        }
        this.keys.push(new KeyButton(row4, '', '', 'Comma'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row4, '', '', 'Period'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row4, '', '', 'Slash'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row4, '▲', '', 'ArrowUp'));
        this.keys.push(new KeyButton(row4, 'Shift', 'double-size', 'ShiftRight'));
        this._kb.append(row4);

        const row5 = document.createElement('div');
        row5.className = 'keyboard-row';
        this.keys.push(new KeyButton(row5, 'Ctrl', '', 'ControlLeft'));
        this.keys.push(new KeyButton(row5, 'Win', '', 'MetaLeft'));
        this.keys.push(new KeyButton(row5, 'Alt', '', 'AltLeft'));
        this.keys.push(new KeyButton(row5, ' ', 'space', 'Space'));
        this._printedKeyNums.push(this.keys.length - 1);
        this.keys.push(new KeyButton(row5, 'Alt', '', 'AltRight'));
        this.keys.push(new KeyButton(row5, '◄', '', 'ArrowLeft'));
        this.keys.push(new KeyButton(row5, '▼', '', 'ArrowDown'));
        this.keys.push(new KeyButton(row5, '►', '', 'ArrowRight'));
        this.keys.push(new KeyButton(row5, 'Ctrl', '', 'ControlRight'));
        this._kb.append(row5);

        this._updateLegend();

        // console.log('legend updated');
    }

    isPressed(id) {
        return this._pressedKeys.includes(id);
    }

    pressKey(id) {
        if (this._pressedKeys.includes(id)) {
            return false;
        }
        // console.log('pressed key ' + id);
        this._pressedKeys.push(id);
        // console.log(this._pressedKeys);
        if (id === 'CapsLock') {
            this.pressedCapsLock();
            if (!this.isCapsLock) {
                this.findKeyById(id).keyUp();
                return true;
            }
        }

        this._checkForShiftAndSwitch();

        this.findKeyById(id).keyDown();
        return true;
    }

    releaseKey(id) {
        // console.log('release of ' + id);

        if (!this._pressedKeys.includes(id)) {
            return false;
        }

        if ((id === 'ShiftLeft') || (id === 'ControlLeft')) {
            if ((this._pressedKeys.length === 2) && (this._pressedKeys.includes('ShiftLeft')) && (this._pressedKeys.includes('ControlLeft'))) {
                this.changeLayout();
            }
        }
        const k = this._pressedKeys.indexOf(id);
        this._pressedKeys.splice(k, 1);

        // console.log('key to release ' + id);
        // console.log(this._pressedKeys);

        if (id === 'CapsLock') {
            return true;
        }
        /* if (id.includes('Shift')) {
            // console.log('includes shift up');
            this.releaseShift();
        } */
        this._checkForShiftAndSwitch();

        this.findKeyById(id).keyUp();
        return true;
    }

    _checkForShiftAndSwitch() {
        let res = null;
        this._pressedKeys.forEach((key) => {
            if (key.includes('Shift')) {
                res = true;
            }
         });
        this.pressedShift(res);
    }

    pressedCapsLock() {
        this.isCapsLock = !this.isCapsLock;
        this._updateLegend();
    }

    releaseCapsLock() {
        this.isCapsLock = false;
        this._updateLegend();
    }

    pressedShift(dir) {
        this.isShift = dir;
        this._updateLegend();
    }

    changeLayout() {
        this.isEngl = !this.isEngl;
        this._updateLegend();
    }

    findKeyById(id) {
        let res = null;
        this.keys.forEach((key) => {
            if (key.id === id) {
                 res = key;
            }
        });
        return res;
    }

    isPrintable(id) {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i].id === id) {
                if (this._printedKeyNums.includes(i)) {
                    return true;
                }
            }
        }
        return false;
    }

    _updateLegend() {
        // console.log('upd isEngl ' + this.isEngl);
        if (!this._legend.length) {
            this._legend = keysLettersEngLow.slice();
        }
        if (!this.isShift) {
            if (this.isEngl) {
                this._legend = keysLettersEngLow.slice();
            } else {
                this._legend = keysLettersRusLow.slice();
            }
            if (this.isCapsLock) {
                this._legend = this._legend.map((v) => v.toUpperCase());
            }
        } else {
            if (this.isEngl) {
                this._legend = keysLettersEngUp.slice();
            } else {
                this._legend = keysLettersRusUp.slice();
            }
            if (this.isCapsLock) {
                this._legend = this._legend.map((v) => v.toLowerCase());
            }
        }

        this._printedKeyNums.map((key, i) => this.keys[key].updateContent(this._legend[i]));
  }
}
