const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const api = supertest(app);

const initialBlogs = [
    {
        title: 'Blog Post1',
        author: 'Steven',
        url: '/post1',
        likes: '3'
    },
    {
        title: 'Blog Post2',
        author: 'Steven',
        url: '/post2',
        likes: '5'
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});

    for(const blog of initialBlogs) {
        const newBlog = new Blog(blog);
        await newBlog.save();
    }

    console.log('database cleared');
});

test('two blog posts are returned', async () => {
    const blogs = await api.get('/api/blogs');

    assert.strictEqual(blogs.body.length, 2);
});

after(async () => {
    mongoose.connection.close();
});