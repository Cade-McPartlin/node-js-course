const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

// Test user data.
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'User 1',
    email: 'user1@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'User 2',
    email: 'user2@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Test Task 1',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Test Task 2',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Test Task 3',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    // Delete all users.
    await User.deleteMany();

    // Delete all tasks.
    await Task.deleteMany();

    // Save new test users to db.
    await new User(userOne).save();
    await new User(userTwo).save();

    // Save new tasks to db.
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};