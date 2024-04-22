const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

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
    const body = req.body;

    try {
        const user = await User.findById(body.userId);

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user.id
        });
        const savedBlog = await blog.save();

        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        res.status(201).json(savedBlog);
    }
    catch(err) { 
        next(err); 
    }
});

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });

        if(updatedBlog) {
            res.json(updatedBlog);
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