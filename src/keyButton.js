/* eslint-disable linebreak-style */
/* eslint-disable prefer-template */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable space-before-blocks */
export default class KeyButton{
    constructor(parentNode, content, altClass = '', id = ''){
        let idP = content;
        if (id) {
            idP = id;
        }
        this.content = content;
        this.id = idP;
        const el = document.createElement('div');
        el.className = 'keyButton';
        if (altClass) {
            el.classList.add(altClass);
        }
        el.innerHTML = content;
        el.setAttribute('data-id', idP);
        if (parentNode) {
            parentNode.append(el);
        }
        this.node = el;
    }

    updateContent(content){
        this.content = content;
        this.node.innerHTML = '';
        this.node.innerHTML = content;
        // this.node.setAttribute('data-id', content);
    }

    pressKey() {
        this.node.classList.add('pressed');
    }

    releaseKey() {
        this.node.classList.remove('pressed');
    }
}
