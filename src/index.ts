require('./index.scss');

let editorContent = document.getElementById('editorContent');

function execCommandFun(aCommandName:string){
    document.execCommand(aCommandName, false, null);
    editorContent.focus();
}

(<any> window).execCommandFun = execCommandFun;