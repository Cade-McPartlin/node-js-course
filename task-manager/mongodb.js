// CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
       name: 'Cade',
       age: 23
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }

        // Array of documents saved to database.
        console.log(result.ops);
    });

    db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        }, {
            name: 'Gunther',
            age: 27
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents.');
        }
        console.log(result.ops);
    });

    // Challenge
    db.collection('tasks').insertMany([
        {
            description: 'Complete Challenge',
            completed: false
        }, {
            description: 'Go out for dinner',
            completed: false
        }, {
            description: 'Get Flowers',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents to tasks collection');
        }

        console.log(result.ops);
    });

});