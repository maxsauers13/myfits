const Axios = require("Axios");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const FormData = require('form-data');

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

app.post("/closetAdd", upload.single('file'), async (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename);
        var imgsrc = 'http://127.0.0.1:3001/images/' + req.file.filename;
        const owner = req.body.owner;
        const category = req.body.category;
        const style = req.body.style;
        const weather = req.body.weather;
        var color = await colorAlgorithm(req.file.filename);

        var insertData = "INSERT INTO Clothes (image, owner, category, style, weather, color) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertData, [imgsrc, owner, category, style, weather, color], (err, result) => {
            if (err) {
                console.log("error: " + err);
            } else {
                console.log("file uploaded");
            }
        })
    }
});

app.post('/clothes', async (req, res) => {
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
        }
    )

    // try {
    //     color = colorAlgorithm(image);
    // } catch (err) {
    //     console.log(err);
    // }

    // db.query("UPDATE MyFits.Clothes SET Color = ? WHERE Image = ?",
    //     [color, image],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(result);
    //         }
    //     }
    // )
})

app.post('/inventoryCount', (req, res) => {
    const owner = req.body.owner;
    const input = req.body.input;
    var countType = "";

    if (input == "shirt" || input == "pants" || input == "outerwear" || input == "shoes") {
        countType = "category";
    } else if (input == "casual" || input == "professional") {
        countType = "style";
    } else if (input == "warm" || input == "cold") {
        countType = "weather";
    }

    const query = "SELECT COUNT(*) AS totalItems FROM Clothes WHERE (owner = '" + owner + "' AND (" + countType + " = '" + input + "' OR " + countType + " = 'any'))";
    db.query(query,
        [],
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
    const style = req.body.style;
    const weather = req.body.weather;

    var styleQuery = "";
    var weatherQuery = "";
    var inputs = [owner, category];
    if (style !== "any") {
        styleQuery = "AND (style = ? OR style = 'any')";
        inputs.push(style);
    }
    if (weather !== "any") {
        weatherQuery = "AND (weather = ? OR weather = 'any')"
        inputs.push(weather);
    }

    db.query("SELECT DISTINCT * FROM MyFits.Clothes WHERE (owner = ? AND category = ? " + styleQuery + weatherQuery + ")",
        inputs,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else {
                res.send(result);
            }
        })
})

app.post('/randomFit', (req, res) => {
    const owner = req.body.owner;
    const category = req.body.category;
    const index = Math.floor((Math.random() * req.body.maxIndex) + 1);

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

async function colorAlgorithm(filename) {
    var formData = new FormData()
    formData.append('file', filename);
    var answer = await Axios.post("http://127.0.0.1:5000/algorithm", formData).then(
        response => {
            var result = response.data;
            return result['top_color'];
        }
    )

    return answer;
}