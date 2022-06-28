const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Lville2019",
    database: "MyFits"
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO Users (username, password) VALUES (?, ?)",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM Users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password combination" });
            }
        })
})

app.listen(3001, () => {
    console.log("running server");
});