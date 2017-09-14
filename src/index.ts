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
    <img class="editor-emoji-table-td" src="${value.base64}" alt="${value.name}" onclick="addEmoji(this)"/>
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
    console.dir(obj);

    let html = `${obj.value}`;
    execCommandFun('insertHTML', html);
}
function imageFileFun(obj: any) {
    const files = obj.files;
    let html = '';
    for (let i = 0; i < files.length; i++) {
        console.dir(files[i]);
        console.log(URL.createObjectURL(files[i]));
        html += `<img src="${URL.createObjectURL(files[i])}"/>`;
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
// let editorFrameLink = document.getElementsByTagName('iframe')['editorFrameLink'];
//
// let frameDocument = editorFrameLink.contentDocument;
// console.dir(frameDocument);
// editorFrameLink.onload = ()=>{
//     console.log(1);
// };

// let addLinkID = frameDocument.getElementById('addLink');
// console.log(addLinkID);

function execCommandFun(aCommandName: string, aValueArgument: any = null) {
    editorContentFocus();
    document.execCommand(aCommandName, false, aValueArgument);
}
function editorContentFocus(){
    editorContent.focus();
}

(<any> window).editorContentFocus = editorContentFocus;

(<any> window).execCommandFun = execCommandFun;
(<any> window).addEmoji = addEmoji;
(<any> window).imageFileFun = imageFileFun;
(<any> window).videoFileFun = videoFileFun;
(<any> window).addLink = addLink;