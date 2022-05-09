/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
export default class TextBox {
    _tb;

    constructor(parentNode) {
        this.pos = 0;
        this.content = [];
        this._tb = document.createElement('textarea');
        this._tb.className = 'textbox';
        if (parentNode) {
            parentNode.append(this._tb);
        }
        this.node = this._tb;
    }

    setFocus() {
        this.node.focus();
        this.node.selectionStart = this.pos;
        this.node.selectionEnd = this.pos;
    }

    addChar(char) {
        this.content.splice(this.pos, 0, char);
        this.pos += 1;
        this.node.value = this.content.join('');
        this.setFocus();
    }

    delete(dir) {
        if (dir === -1) {
            this.pos -= 1;
        }
        this.content.splice(this.pos, 1);
        this.node.value = this.content.join('');
        this.setFocus();
    }

    enter() {
        this.content.splice(this.pos, 0, '\n');
        this.pos += 1;
        this.node.value = this.content.join('');
        this.setFocus();
    }

    moveHoriz(dir) {
        this.pos += dir;
        this.setFocus();
    }

    moveVert(dir) {
        this.pos = (dir === -1) ? 0 : this.content.length;
        this.setFocus();
    }
}
