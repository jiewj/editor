require('./index.scss');

let xhr = new XMLHttpRequest();
xhr.open('get', './emoji.json', true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            emojiHtml(xhr.response);
        }
    }
};
xhr.send();

function emojiHtml(response: any) {
    const emoji = JSON.parse(response);
    let emojiTable = document.getElementById('emojiTable');
    let emojiTr = '', emojiTd = '';
    emoji.forEach((value: any) => {
        if ((emoji.indexOf(value) + 1) % 15 == 0) {
            emojiTr += '<tr>' + emojiTd + '</tr>';
            emojiTd = '';
        } else {
            emojiTd += `
<td>
    <img class="editor-emoji-table-td" src="${value.base64}" alt="${value.name}" onclick="event.stopPropagation();addEmoji(this)"/>
</td>`;
            if (emoji.length == emoji.indexOf(value) + 1) {
                emojiTr += '<tr>' + emojiTd + '</tr>';
            }
        }
    });
    emojiTable.innerHTML = '<table class="editor-emoji-table">' + emojiTr + '</table>';

}

function addEmoji(obj: any) {
    let html = `<img src="${obj.src}" alt="${obj.alt}"/>`;
    execCommandFun('insertHTML', html);
}
function addLink(obj?: any) {
    let html = `<a href="${obj.value}" target="_blank">${obj.value}</a>&nbsp;`;
    execCommandFun('insertHTML', html);
}
function imageFileFun(obj: any) {
    const files = obj.files;
    let html = '';
    for (let i = 0; i < files.length; i++) {
        console.dir(files[i]);
        console.log(URL.createObjectURL(files[i]));
        html += `<img class="editor-content-img" src="${URL.createObjectURL(files[i])}"/>`;
    }
    execCommandFun('insertHTML', html);
}
function videoFileFun(obj: any) {
    const files = obj.files;
    let html = '';
    for (let i = 0; i < files.length; i++) {
        console.dir(files[i]);
        console.log(URL.createObjectURL(files[i]));
        html += `<video contenteditable="false" controls src="${URL.createObjectURL(files[i])}"></video>`;
    }
    execCommandFun('insertHTML', html);
}

let editorContent = document.getElementById('editorContent');

editorContent.addEventListener('mouseup', function () {
    let focusNode = getSelection().focusNode.parentNode;

    let checked = {
        'I': 'italic',
        'B': 'bold',
        'U': 'underline',
        'LI': 'insertUnorderedList',
        'center': 'justifyCenter',
        'justify': 'justifyFull'
    };

    let hasTag: any = [];

    nodeName(focusNode);

    if (hasTag.length > 0) {
        let dataType = document.querySelectorAll(`[data-type]`);
        for (let i = 0; i < dataType.length; i++) {
            (dataType[i] as HTMLInputElement).checked = false;
        }
        hasTag.forEach((value: any) => {
            let type = document.querySelectorAll(`[data-type="${checked[value]}"]`)[0] as HTMLInputElement;
            type.checked = true;
        });
    }

    console.dir(getSelection());
    let first = getSelection().getRangeAt(0);
    console.dir(first);


    if (!first.collapsed) {
        let start = first.startContainer;
        let end = first.endContainer;

        console.log(start != end);

        if (start != end) {
            if (end.parentNode.nodeName in checked) {

                if (start.parentNode && (start.parentNode == end.parentNode)) {
                    parentFun(start.parentNode);
                }

            } else {
                console.log(end)

            }
            console.dir(first.startContainer);
            console.dir(first.endContainer);
        } else {
        }

    }


    function parentFun(obj:any){
        console.dir(obj);
    }


    function nodeName(obj: any) {
        if (obj.nodeName in checked) {
            hasTag.push(obj.nodeName);
            nodeName(obj.parentNode);
        } else {
            let textAlign = obj.style.textAlign;
            if (textAlign) {
                hasTag.push(textAlign);
            }
        }

    }
});


function execCommandFun(aCommandName: string, aValueArgument: any = null) {
    editorContentFocus();
    document.execCommand(aCommandName, false, aValueArgument);
}
function editorContentFocus() {
    editorContent.focus();

}

(<any> window).editorContentFocus = editorContentFocus;

(<any> window).execCommandFun = execCommandFun;
(<any> window).addEmoji = addEmoji;
(<any> window).imageFileFun = imageFileFun;
(<any> window).videoFileFun = videoFileFun;
(<any> window).addLink = addLink;

let editorContentBox = document.getElementsByClassName('editor-content-box')[0];

let editorScrollTop = document.getElementsByClassName('editor-scroll-top')[0] as HTMLElement;
editorContentBox.addEventListener('scroll', function () {
    let top = Math.trunc((this.scrollTop) / this.scrollHeight * editorContentBox.clientHeight);
    let topMax = Math.trunc((this.scrollHeight - editorContentBox.clientHeight) / this.scrollHeight * editorContentBox.clientHeight);
    let height = Math.trunc((editorContentBox.clientHeight - topMax) / editorContentBox.clientHeight * 1000) / 1000;
    editorScrollTop.style.transform = `translateY(${top}px) scaleY(${height})`;
});

let emojiIcon = document.getElementsByClassName('emojiIcon')[0] as HTMLInputElement;
let iframeLink = document.getElementsByClassName('iframeLink')[0] as HTMLInputElement;


document.addEventListener('click', function (e) {
    let target = e.target as HTMLElement;
    if (target.className != 'emojiIcon') {
        emojiIcon.checked = false;
    }
    if (target.className != 'iframeLink') {
        iframeLink.checked = false;
    }

});