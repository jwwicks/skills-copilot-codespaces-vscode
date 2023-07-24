// Create web server and handle requests

// import modules
const express = require('express');
const bodyParser = require('body-parser');
const comments = require('./comments');

// create web server
const app = express();

// use middleware
app.use(bodyParser.json());

// handle GET requests
app.get('/api/comments', (req, res) => {
    res.send(comments.get());
});

// handle POST requests
app.post('/api/comments', (req, res) => {
    const { body } = req;
    const { username, content } = body;
    if (!username || !content) {
        res.status(400).send('You need a username and content');
    } else {
        const comment = comments.add(username, content);
        res.status(201).send(comment);
    }
});

// handle PUT requests
app.put('/api/comments/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { username, content } = body;
    const comment = comments.update(id, username, content);
    res.status(200).send(comment);
});

// handle DELETE requests
app.delete('/api/comments/:id', (req, res) => {
    const { id } = req.params;
    comments.delete(id);
    res.status(204).send();
});

// start web server
app.listen(3001, () => {
    console.log('Web server listening on port 3001');
});
