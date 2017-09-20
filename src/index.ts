require('./index.scss');

// let xhr = new XMLHttpRequest();
// xhr.open('get', './emoji.json', true);
//
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//             emojiHtml(xhr.response);
//         }
//     }
// };
// xhr.send();
// const response = require('./emoji.json');
// console.dir(response);
// emojiHtml(response);
const emojiName = ["U0001F47B","U0001F47F","U0001F600","U0001F601","U0001F602","U0001F603","U0001F604","U0001F605","U0001F606","U0001F607","U0001F608","U0001F609","U0001F60A","U0001F60B","U0001F60C","U0001F60D","U0001F60E","U0001F60F","U0001F610","U0001F611","U0001F612","U0001F613","U0001F614","U0001F615","U0001F616","U0001F617","U0001F618","U0001F619","U0001F61A","U0001F61B","U0001F61C","U0001F61D","U0001F61E","U0001F61F","U0001F620","U0001F621","U0001F622","U0001F623","U0001F624","U0001F625","U0001F626","U0001F627","U0001F628","U0001F629","U0001F62A","U0001F62B","U0001F62C","U0001F62D","U0001F62E","U0001F62F","U0001F630","U0001F631","U0001F632","U0001F633","U0001F634","U0001F635","U0001F636","U0001F637","U0001F641","U0001F642","U0001F643","U0001F644","U0001F910","U0001F911","U0001F912","U0001F913","U0001F914","U0001F915","U0001F917","U0002620","U0002639","U000263A"];
emojiHtml(emojiName);
function emojiHtml(response: any) {
    // const emoji = JSON.parse(response);
    const emoji = response;
    let emojiTable = document.getElementById('emojiTable');
    let emojiTr = '', emojiTd = '';
    emoji.forEach((value: any) => {
        if ((emoji.indexOf(value) + 1) % 15 == 0) {
            emojiTr += '<tr>' + emojiTd + '</tr>';
            emojiTd = '';
        } else {
            emojiTd += `
<td>
    <span class="editor-emoji-table-td ${value}" data-emoji="${value}" onclick="event.stopPropagation();addEmoji(this)"></span>
</td>`;
            if (emoji.length == emoji.indexOf(value) + 1) {
                emojiTr += '<tr>' + emojiTd + '</tr>';
            }
        }
    });
    emojiTable.innerHTML = '<table class="editor-emoji-table">' + emojiTr + '</table>';

}

function addEmoji(obj: any) {
    let img = getComputedStyle(obj).getPropertyValue("background-image");
    img = img.slice(img.indexOf('"')+1,img.lastIndexOf('"'));
    let html = `<img src="${img}" alt="${obj.dataset.emoji}"/>`;
    execCommandFun('insertHTML', html);
    rangFun();
}
function addLink(obj?: any) {
    let html = `&nbsp;<a href="${obj.value}" target="_blank">${obj.value}</a>&nbsp;`;
    execCommandFun('insertHTML', html);
    rangFun();
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
    rangFun();
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
    rangFun();
}

let editorContent = document.getElementById('editorContent');

editorContent.addEventListener('mouseup', rangFun);

function rangFun(){
    let focusNode = getSelection().focusNode.parentNode;

    let checked = {
        'I': 'italic',
        'B': 'bold',
        'U': 'underline',
        'LI': 'insertUnorderedList',
        'UL': '',
        'center': 'justifyCenter',
        'justify': 'justifyFull'
    };

    let hasTag: any = [];

    let first = getSelection().getRangeAt(0);

    if (!first.collapsed && first.startContainer != first.endContainer) {
        nodeName(first.commonAncestorContainer);
    } else {
        nodeName(focusNode);
    }

    if (hasTag.length > 0) {
        let dataType = document.querySelectorAll(`[data-type]`);
        for (let i = 0; i < dataType.length; i++) {
            (dataType[i] as HTMLInputElement).checked = false;
        }
        hasTag.forEach((value: any) => {
            if (value != 'UL') {
                let type = document.querySelectorAll(`[data-type="${checked[value]}"]`)[0] as HTMLInputElement;
                type.checked = true;
            }
        });
    }else{
        let checked = document.querySelectorAll('[data-type]:checked');
        for (let i = 0; i < checked.length; i++) {
            execCommandFun((<HTMLInputElement> checked[i]).dataset.type);
        }
    }

    function nodeName(obj: any) {
        let textAlign = obj.style.textAlign;
        if (textAlign) {
            hasTag.push(textAlign);
        }
        if (obj.nodeName in checked) {
            hasTag.push(obj.nodeName);
            nodeName(obj.parentNode);
        }
    }
}

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