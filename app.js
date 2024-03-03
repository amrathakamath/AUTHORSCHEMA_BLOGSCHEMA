const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });


const authorSchema = new mongoose.Schema({
    name: String,
    email: String,
    publishedDate: Date
});

const blogSchema = new mongoose.Schema({
    title: String,
    blogContent: String,
    authorName: String
});

const Author = mongoose.model('Author', authorSchema);
const Blog = mongoose.model('Blog', blogSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/authors', async (req, res) => {
    try {
        const { name, email, publishedDate } = req.body;
        const author = new Author({ name, email, publishedDate });
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.post('/blogs', async (req, res) => {
    try {
        const { title, blogContent, authorName } = req.body;
        const blog = new Blog({ title, blogContent, authorName });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
