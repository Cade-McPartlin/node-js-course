require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete("6029b526b9797092be038dce").then(() => {
   return Task.find({ completed: false });
}).then((result) => {
    console.log(result.length);
}).catch((e) => {
    console.log(e);
});