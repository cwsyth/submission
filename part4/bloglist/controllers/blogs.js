const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (req, res, next) => {
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
        next(err);
    }
});

blogsRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body);

    try {
        const result = await blog.save();
        res.status(201).json(result);
    }
    catch(err) { 
        next(err); 
    }
});

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });

        if(result) {
            res.json(result);
        }
        else {
            res.status(404).end();
        }
    }
    catch(err) {
        next(err);
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const result = await Blog.findByIdAndDelete(req.params.id);

        if(result) {
            return res.status(204).end();
        }
        else {
            return res.status(404).end();
        }
    }
    catch(err) {
        next(err);
    }
});

module.exports = blogsRouter;