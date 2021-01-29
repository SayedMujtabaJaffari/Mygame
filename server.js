let express = require('express');
let sqlite3 = require('sqlite3');


let app = express();

let db = new sqlite3.Database('USER.db');

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies


app.get('/showhight', function (req, res) {


    let sql = `SELECT * FROM listop ORDER BY score DESC`;
    db.all(sql, (err, rows) => {
        if (err) {
            throw err
        }
        res.json(rows)
    })

})


app.post('/show', function (req, res) {

    let name = req.body.name;
    let score = parseInt(req.body.score);

    if (score <= 3) {
        res.send(name + ' yours score ' + score + ' is under 3 and we can not put in server.')

    }
    else if (name == "") {
        res.send('Please enter your Name !!')
    }

    else {
        console.log(name, score);
        if(score !== "" &&name !== ""){
        let sql = `INSERT INTO listop  (name,score) VALUES (?, ?)`
        db.run(sql, [name, score], (err) => {
            if (err) {
                throw err;
            }

            res.send(name + ' yours score  ' + score + ' is be added into server!')



        })
    }
    }

})


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')


})

app.listen(3001, () => { console.log(" Starta 3001"); })
