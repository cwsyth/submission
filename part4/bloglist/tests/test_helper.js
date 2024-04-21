const Blog = require('../models/Blog');
const User = require('../models/User');

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

async function getBlogs() {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
}

async function getUsers() {
    const users = await User.find({});
    return users;
}

module.exports = { initialBlogs, getBlogs, getUsers };