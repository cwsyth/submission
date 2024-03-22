const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    for(const blog of helper.initialBlogs) {
        const newBlog = new Blog(blog);
        await newBlog.save();
    }

    console.log('database cleared');
});

test('two blog posts are returned', async () => {
    const blogs = await helper.getBlogs();

    assert.strictEqual(blogs.length, helper.initialBlogs.length);
});

test('toJSON blog object contains id property', async () => {
    const blogs = await helper.getBlogs();
    const blogsWithId = blogs.filter((blog) => {
        return blog.id ? true : false;
    });

    assert.strictEqual(blogsWithId.length, helper.initialBlogs.length);
});

test('add blog', async () => {
    const blog = {
        title: 'Blog Post3',
        author: 'Steven',
        url: '/post3',
        likes: '10'
    };

    const result = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogIds = (await helper.getBlogs()).map((blog) => blog.id);

    assert.strictEqual(blogIds.length, helper.initialBlogs.length + 1);
    assert(blogIds.includes(result.body.id));
});

test('missing likes property will be added with default 0', async () => {
    const blog = {
        title: 'Blog Post3',
        author: 'Steven',
        url: '/post3'
    };

    const result = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    assert(result.body.likes !== undefined);
    assert.strictEqual(result.body.likes, 0);
});

test('missing title and url property throw a validation error', async () => {
    const blog1 = {
        author: 'Steven',
        url: '/post3',
        likes: '10'
    };

    await api
        .post('/api/blogs')
        .send(blog1)
        .expect(400);

    const blog2 = {
        title: 'Blog Post3',
        author: 'Steven',
        likes: '10'
    };

    await api
        .post('/api/blogs')
        .send(blog2)
        .expect(400);
});

test('delete blog by id', async () => {
    const blogToDelete = (await helper.getBlogs())[0];

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogs = (await helper.getBlogs()).map((blog) => blog.id);

    assert(!blogs.includes(blogToDelete.id));
    assert.strictEqual(blogs.length, helper.initialBlogs.length - 1);
});

after(async () => {
    mongoose.connection.close();
});