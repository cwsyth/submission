const { test, beforeEach, after } = require('node:test');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const initialUser = new User({
        username: 'root',
        name: 'root',
        passwordHash
    });
    await initialUser.save();

    console.log('database cleared');
});

test('invalid user will throw a validation error', async () => {
    const user1 = {
        username: 'root2',
        name: 'root2',
        password: 'short'
    };

    await api
        .post('/api/users')
        .send(user1)
        .expect(400);

    console.log(await helper.getUsers());
});

after(async () => {
    mongoose.connection.close();
});