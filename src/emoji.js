// let imgName = [
//     'U0001F600','U0001F601','U0001F602','U0001F603','U0001F604','U0001F605','U0001F606','U0001F608','U0001F609','U0001F610','U0001F611','U0001F612','U0001F613','U0001F614','U0001F615','U0001F616','U0001F617','U0001F618','U0001F619','U0001F620','U0001F621','U0001F622','U0001F623','U0001F624','U0001F625','U0001F626','U0001F627','U0001F628','U0001F629','U0001F630','U0001F631','U0001F632','U0001F633','U0001F634','U0001F635','U0001F636','U0001F637','U0001F641','U0001F642','U0001F643','U0001F644','U0001F910','U0001F911','U0001F912','U0001F913','U0001F914','U0001F915','U0001F917','U0001F60A','U0001F60B','U0001F60C','U0001F60D','U0001F60E','U0001F60F','U0001F61A','U0001F61B','U0001F61C','U0001F61D','U0001F61E','U0001F61F','U0001F62A','U0001F62B','U0001F62C','U0001F62D','U0001F62E','U0001F62F','U0001F47B','U0001F47F','U0002620','U0002639','U000263A'];
//
// console.dir(imgName);

const fs = require('fs');
const path = require('path');
let json = [];
let emojiPath = path.resolve('./emoji');
let files = fs.readdirSync(emojiPath).filter(file => {
  let filename = file.slice(0, file.indexOf('.'));
  let base64 = 'filename'// data:image/png;base64,+ fs.readFileSync(emojiPath + '/' + file).toString('base64');
  json[filename]=base64;
  // json.push({name:filename,base64:base64});
});

let str = json.join();
console.log(json);
// console.log(JSON.parse(str));

// fs.writeFileSync('emoji.json',JSON.stringify(json),(err)=>{
//   if (err) throw err;
//   console.log('The file has been saved!');
// });