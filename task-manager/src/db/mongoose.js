const mongoose = require('mongoose');

// Connect to MongoDB with mongoose. Making sure indexes will be created.
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// Create new user model with Mongoose.
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

// Create Task model.
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

// Create new instance of User model.
// const me = new User({
//    name: 'Cade',
//    age: 'Mike'
// });

// Save instance of me to MongoDB, returns promise.
// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// });

// Create instance of Task model.
const cleanHouse = new Task({
    description: 'Clean the house',
    completed: false
});

cleanHouse.save().then(() => {
    console.log(cleanHouse);
}).catch((error) => {
   console.log(error);
});