import {KeyButton} from './keyButton.js';

const keysLettersEngLow = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ ".split('');
const keysLettersEngUp = '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? '.split(''); //when capslock symbols and digits like in low
const keysLettersRusLow = 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю. '.split('');
const keysLettersRusUp = 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ, '.split(''); //when capslock symbols and digits like in low
const keysDigits = '1234567890-='.split('');
const keysSignsEng = '~!@#$%^&*()_+'.split('');
const keysSignsRus = '!"№;%:?*()_+'.split('');



export class Keyboard{
    _keys;
    _btnBackSpace;
    _btnDel;
    _btnTab;
    _btnCapsLock;
    _btnLeftShift;
    _btnRightShift;
    _btnLeftCtrl;
    _btnRightCtrl;
    _btnLeftAlt;
    _btnRightAlt;
    _btnEnter;
    _btnWin;
    _btnsArrows;
    _kb;
    _legend;
    constructor(parentNode,isEngl){
        this._keys = []; 
        this._btnsArrows = [];
        this._legend =[];

        this._kb = document.createElement('div');
        this._kb.className = 'keyboard';       
        if (parentNode) {
            parentNode.append(this._kb);
        }
        this.node = this._kb;

        const row1 = document.createElement('div');
        row1.className ='keyboard-row';
        console.log('under construction');
        for (let i = 0; i< 13; i++){
            this._keys.push(new KeyButton(row1,''))    
        }
        this._btnBackSpace = new KeyButton(row1, 'BackSpace','double-size');
        console.log(this._keys);
        this._kb.append(row1);
    
        const row2 = document.createElement('div');
        row2.className ='keyboard-row';
        console.log('under construction2');
        this._btnTab = new KeyButton(row2, 'Tab','tab-size');
        for (let i = 0; i< 13; i++){
            this._keys.push(new KeyButton(row2,''))    
        }
        this._btnDel = new KeyButton(row2, 'Del','tab-size');
        console.log(this._keys);
        this._kb.append(row2);
    
        const row3 = document.createElement('div');
        row3.className ='keyboard-row';
        console.log('under construction3');
        this._btnCapsLock = new KeyButton(row3, 'CapsLock','double-size');
        for (let i = 0; i< 11; i++){
            this._keys.push(new KeyButton(row3,''))    
        }
        this._btnEnter = new KeyButton(row3, 'Enter','double-size');
        console.log(this._keys);
        this._kb.append(row3);
    
        const row4 = document.createElement('div');
        row4.className ='keyboard-row';
        console.log('under construction4');
        this._btnLeftShift = new KeyButton(row4, 'Shift','double-size');
        for (let i = 0; i< 10; i++){
            this._keys.push(new KeyButton(row4,''))    
        }
        this._btnsArrows.push(new KeyButton(row4,'▲'));
        this._btnRightShift = new KeyButton(row4, 'Shift','double-size');
        console.log(this._keys);
        this._kb.append(row4);
    
        const row5 = document.createElement('div');
        row5.className ='keyboard-row';
        console.log('under construction5');
        this._btnLeftCtrl = new KeyButton(row5, 'Ctrl');
        this._btnWin = new KeyButton(row5, 'Win');
        this._btnLeftAlt = new KeyButton(row5, 'Alt');
        this._keys.push(new KeyButton(row5,'','space'));   
        this._btnRightAlt = new KeyButton(row5, 'Alt'); 
        this._btnsArrows.push(new KeyButton(row5,'◄'));
        this._btnsArrows.push(new KeyButton(row5,'▼'));
        this._btnsArrows.push(new KeyButton(row5,'►'));
        this._btnRightCtrl = new KeyButton(row5, 'Ctrl');
        console.log(this._keys);
        this._kb.append(row5);           
        this._updateLegend(false,true,false);
    }
    _updateLegend(isEngl, isShift = false, isCapsLock = false){
        
        if (!this._legend.length){
            this._legend = keysLettersEngLow.slice();
        }
        if(!isShift){
            if (isEngl){
                this._legend = keysLettersEngLow.slice();   
            }else{
                this._legend = keysLettersRusLow.slice();
            }
            if (isCapsLock){
                this._legend = this._legend.map(v =>{
                    //console.log(v, v.toUpperCase());
                     return v.toUpperCase();
                    });                
            }
        }else{
            if (isEngl){
                this._legend = keysLettersEngUp.slice();   
            }else{
                this._legend = keysLettersRusUp.slice();
            }
            if (isCapsLock){
                this._legend =  this._legend.map(v => v.toLowerCase());
            }    
        }
        this._keys.map((key,i) => key.updateContent(this._legend[i]));
    } 
}




