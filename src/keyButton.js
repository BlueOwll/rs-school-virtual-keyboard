export class KeyButton{
    constructor(parentNode,content, altClass=''){
        this.content = content;
        const el = document.createElement('div');
        el.className = 'keyButton'+' '+altClass;
        el.innerHTML = content;
        if (parentNode) {
            parentNode.append(el);
        }
        this.node = el;
    }
    updateContent(content){
        this.content = content;
        this.node.innerHTML = '';
        this.node.innerHTML = content;
    }
}
