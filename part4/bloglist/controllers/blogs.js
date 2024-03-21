const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({});

        if(blogs) {
            res.json(blogs);
        }
        else {
            res.status(404).end();
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).end();
    }
});

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body);

    try {
        const result = await blog.save();
        res.status(201).json(result);
    }
    catch(err) {
        console.log(err);
        res.status(500).end();
    }
});

module.exports = blogsRouter;