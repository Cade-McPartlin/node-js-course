const fs = require('fs');
//
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// };
//
// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);


// CHALLENGE
const dataBuffer = fs.readFileSync('1-json.json');
const dataJson = dataBuffer.toString();
const user = JSON.parse(dataJson);

user.name = 'Cade';
user.age = 23;

fs.writeFileSync('1-json.json', JSON.stringify(user));
