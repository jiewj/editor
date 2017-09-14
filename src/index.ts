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
    <span class="editor-emoji-table-td" data-name="${value.name}" style="background-image: url(${value.base64})"></span>
</td>`;
            if (emoji.length == emoji.indexOf(value) + 1) {
                emojiTr += '<tr>' + emojiTd + '</tr>';
            }
        }
    });
    emojiTable.innerHTML = '<table class="editor-emoji-table">' + emojiTr + '</table>';
}


let editorContent = document.getElementById('editorContent');

function execCommandFun(aCommandName: string) {
    document.execCommand(aCommandName, false, null);
    editorContent.focus();
}

(<any> window).execCommandFun = execCommandFun;