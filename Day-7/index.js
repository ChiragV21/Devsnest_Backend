const express = require('express');
const app = express();
app.listen(5000);

app.get("/withjson", (req, res) => {
    res.json({ a: 1 });
})

app.get("/status", (req, res) => {
    res.status(200);   
    res.send("hello");
})

app.get("/statusi", (req, res) => {               
    res.sendStatus(500).json({ a: 1 });
})

app.get("/query", (req, res) => {
    res.send(req.query.k)
})

app.get("/users/:userID/book/:bookID", (req, res) => {
    res.send(req.params);
})