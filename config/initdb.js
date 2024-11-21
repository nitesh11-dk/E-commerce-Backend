import User from '../models/user.js'
import { connectDb } from './dbconfig.js'


connectDb();

const dummyUsers = [
    { name: 'Alice', email: 'alice@example.com', age: 25, isActive: true },
    { name: 'Bob', email: 'bob@example.com', age: 30, isActive: false },
    { name: 'Charlie', email: 'charlie@example.com', age: 22, isActive: true },
    { name: 'David', email: 'david@example.com', age: 35, isActive: true },
];


User.insertMany(dummyUsers)
    .then((users) => {
        console.log('Dummy users added:', users);
        process.exit(1);
    })
    .catch((err) => {
        console.error('Error inserting data:', err);
        process.exit(1);
    });

