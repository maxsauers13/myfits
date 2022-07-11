const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

const app = express();

const dir = path.join(__dirname, 'images');
app.use('/images', express.static(dir));
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

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images');     // directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: storage
});

app.post("/closetAdd", upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename);
        var imgsrc = 'http://127.0.0.1:3001/images/' + req.file.filename;
        const owner = req.body.owner;
        const category = req.body.category;
        const style = req.body.style;

        var insertData = "INSERT INTO Clothes (image, owner, category, style) VALUES (?, ?, ?, ?)";
        db.query(insertData, [imgsrc, owner, category, style], (err, result) => {
            if (err) {
                console.log("error: " + err);
            } else {
                console.log("file uploaded");
            }
        })
    }
});

app.post('/clothes', (req, res) => {
    const index = req.body.index;
    const owner = req.body.owner;
    const category = req.body.category;

    db.query("SELECT * FROM (SELECT DISTINCT * FROM MyFits.Clothes WHERE (owner = ? AND category = ?) ORDER BY id LIMIT ?) AS top ORDER BY id DESC LIMIT 1",
        [owner, category, index],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else {
                res.send(result);
            }
        })
})

app.post('/clothesCount', (req, res) => {
    const owner = req.body.owner;
    const category = req.body.category;

    db.query("SELECT COUNT(*) AS totalItems FROM Clothes WHERE (owner = ? AND category = ?)",
        [owner, category],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else {
                res.send(result);
            }
        })
})

app.post('/fit', (req, res) => {
    const owner = req.body.owner;
    const category = req.body.category;
    const index = Math.floor(Math.random());

    db.query("SELECT * FROM (SELECT DISTINCT * FROM MyFits.Clothes WHERE (owner = ? AND category = ?) ORDER BY id LIMIT ?) AS top ORDER BY id DESC LIMIT 1",
        [owner, category, index],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else {
                res.send(result);
            }
        })
})

app.listen(3001, () => {
    console.log("running server");
});