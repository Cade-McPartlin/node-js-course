require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete("6029b526b9797092be038dce").then(() => {
//    return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result.length);
// }).catch((e) => {
//     console.log(e);
// });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount('6029a32cca95ba8f3f54e1ab').then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});