const mongoose = require('mongoose');
const validator = require('validator');

// Connect to MongoDB with mongoose. Making sure indexes will be created.
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// Create new user model with Mongoose.
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
      type: String,
      required: true,
        minlength: 7,
      trim: true,
      validate(value) {
          if (value.toLowerCase().includes('password')) {
              throw new Error('Password cannot contain "password"');
          }
      }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
});

// Create Task model.
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// // Create new instance of User model.
// const me = new User({
//     name: '    Cade    ',
//     email: 'MYEMAIL@TEST.COM     ',
//     password: '123'
// });
//
// // Save instance of me to MongoDB, returns promise.
// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// });

// Create instance of Task model.
// const cleanHouse = new Task({
//     description: '          Clean the house',
//     completed: false
// });
//
// cleanHouse.save().then(() => {
//     console.log(cleanHouse);
// }).catch((error) => {
//    console.log(error);
// });