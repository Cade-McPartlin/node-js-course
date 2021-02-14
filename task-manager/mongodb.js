// CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // db.collection('users').findOne({ name: 'Jen', age: 1 }, (error, userDocument) => {
    //      if (error) {
    //          return console.log('Unable to fetch user.');
    //      }
    //
    //      console.log(userDocument);
    // });
    //
    // db.collection('users').find({ age: 27 }).toArray((error, userDocuments) => {
    //     console.log(userDocuments);
    // });
    //
    // db.collection('users').find({ age: 27 }).count((error, userDocuments) => {
    //     console.log(userDocuments);
    // });
    //
    // db.collection('tasks').findOne({ _id: new ObjectID("60287189bee8c47c1a3c86fd") }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch task.');
    //     }
    //
    //     console.log(task);
    // });
    //
    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('Unable to fetch tasks.');
    //     }
    //
    //     console.log(tasks);
    // });
});