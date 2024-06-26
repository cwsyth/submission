const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
        const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

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
        const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        const userHasBlog = user.blogs.some((id) => {
            id === req.params.id;
        });
        
        if(userHasBlog) {
            const result = await Blog.findByIdAndDelete(req.params.id);

            if(result) {
                return res.status(204).end();
            }
            else {
                return res.status(404).end();
            }
        }
        else {
            res.status(401).end();
        }
    }
    catch(err) {
        next(err);
    }
});

module.exports = blogsRouter;