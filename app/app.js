const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const BookSchema = new mongoose.Schema({
    title: String,
    author: String
});

const Book = mongoose.model('Book', BookSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html');
});
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (err) {
        res.status(500).send('Failed to fetch books.');
    }
});

app.post('/favorite_book', async (req, res) => {
    const { title, author } = req.body;

    if(!title || !author) {
        return res.status(400).send('Both title and author are required.');
    }
    try {
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author
        });

        // redirects to success.html
        await newBook.save();
        res.redirect('/success');
        // await newBook.save();
        // res.send('Thank you for your recommendation!');
    } catch (err) {
        res.status(500).send('An error occurred while saving your book. Please try again.');
        console.error(err);
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});


