const express = require('express');
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/", (req, res) => {
    res
        .status(201)
        .cookie("token", "test", {
            expire: new Date(Date.now() + 8 * 3600000) 
        })
        .cookie("hello", "hello")
        .redirect(301, "/admin") 
});


app.listen(5000);