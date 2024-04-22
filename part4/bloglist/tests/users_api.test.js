const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
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
    const usersAtStart = await helper.getUsers();

    const user1 = {
        username: 'root2',
        name: 'root2',
        password: 'short'
    };

    await api
        .post('/api/users')
        .send(user1)
        .expect(400);

    const user2 = {
        name: 'root2',
        password: 'password'
    };

    await api
        .post('/api/users')
        .send(user2)
        .expect(400);

    const usersAtEnd = await helper.getUsers();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

after(async () => {
    mongoose.connection.close();
});