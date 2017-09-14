const fs = require('fs');
const path = require('path');
let json = [];
let emojiPath = path.resolve('./emoji');
fs.readdirSync(emojiPath).filter(file => {
  let type = file.slice(file.indexOf('.')+1);
  if(type === 'png'){
    let filename = file.slice(0, file.indexOf('.'));
    let base64 = 'data:image/png;base64,'+ fs.readFileSync(emojiPath + '/' + file).toString('base64');
    console.log(fs.readFileSync(emojiPath + '/' + file));
    json.push({name:filename,base64:base64});
  }

});

fs.writeFileSync('emoji.json',JSON.stringify(json),(err)=>{
  if (err) throw err;
  console.log('The file has been saved!');
});