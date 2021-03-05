const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

// Test user data.
const userOne = {
  name: 'User 1',
  email: 'user1@example.com',
  password: '56what!!'
};

// Function that runs before each test case.
beforeEach(async () => {
    // Delete all users.
    await User.deleteMany();

    // Save new test user to db.
    await new User(userOne).save();
});

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
       name: 'Cade',
       email: 'cade@example.com',
       password: 'MyPass777!'
    }).expect(201);
});

test('Should login existing user', async () => {
   await request(app).post('/users/login').send({
       email: userOne.email,
       password: userOne.password
   }).expect(200);
});

test('Should not login nonexistent user', async () => {
   await request(app).post('/users/login').send({
       email: userOne.email,
       password: 'thisisnotmypass'
   }).expect(400);
});