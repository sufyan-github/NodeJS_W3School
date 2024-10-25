var con = require('./connectionSQL');
var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/register.html');
});

app.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    con.connect(function (err) {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).send('Error connecting to database');
            return;
        }

        //InsertOne(name, email, phone, con, res);
        var sql = "INSERT INTO students (name, email, phone) VALUES ?";
        var values = [[name, email, phone]];

        con.query(sql, [values], function (err, result) {
            if (err) {
                console.error('Error inserting student:', err);
                res.status(500).send('Error inserting student');
            };
            //  else {
            //     // console.log('1 Record inserted');
            //     // res.send('Student Registration successful, ID: ' + result.insertId);

            // };
            res.redirect('/students');
        });

    });
});

app.get('/students', function (req, res) {
    con.connect(function (err) {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).send('Error connecting to database');
            return;
        };

        var sql = " SELECT * FROM students";

        con.query(sql, function (err, result) {
            if (err) {
                console.log('Error querying database:', err);
                res.status(500).send('Error querying database');
                return;
            };
            //console.log(result);
            res.render(__dirname + "/students", { students: result });
        });
    });
});

app.listen(7000, function () {
    console.log("Server running on port 7000");
});

function InsertOne(name, email, phone, con, res) {
    var sql = "INSERT INTO students (name, email, phone) VALUES ?";
    var values = [[name, email, phone]];

    con.query(sql, [values], function (err, result) {
        con.end();
        if (err) {
            console.error('Error inserting student:', err);
            res.status(500).send('Error inserting student');
        } else {
            // console.log('1 Record inserted');
            // res.send('Student Registration successful, ID: ' + result.insertId);

        }
    });
}
