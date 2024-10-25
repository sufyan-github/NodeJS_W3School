var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    else {
        console.log("Connected");
        // InsertOne(con);
        //InsertMultiple(con);
        // SelectData(con);
        // dropTabe(con);
        updateData(con);
    }


})

function createDB(con) {
    con.query('CREATE DATABASE mydb', function (err, result) {
        if (err) throw err;
        console.log("Database Created")
    });
}

function CreateTable(con) {
    var sql = "CREATE TABLE customers1 (id INT AUTO_INCREMENT PRIMARY KEY ,name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Created");
    });

};

function AlterTable(con) {
    var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Created");
    })
};

function InsertOne(con) {
    var sql = "INSERT INTO customers (name , address) VALUES ('Company Name', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('1 Record inserted');
    })
};

function InsertMultiple(con) {
    var sql = "INSERT INTO customers (name , address) VALUES ?";
    var values = [
        ['John', 'Highway 71'],
        ['Peter', 'Lowstreet 4'],
        ['Amy', 'Apple st 652'],
        ['Hannah', 'Mountain 21'],
        ['Michael', 'Valley 345'],
        ['Sandy', 'Ocean blvd 2'],
        ['Betty', 'Green Grass 1'],
        ['Richard', 'Sky st 331'],
        ['Susan', 'One way 98'],
        ['Vicky', 'Yellow Garden 2'],
        ['Ben', 'Park Lane 38'],
        ['William', 'Central st 954'],
        ['Chuck', 'Main Road 989'],
        ['Viola', 'Sideway 1633']
    ]
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    })
};

function SelectData(con) {
    var sql = " SELECT * FROM customers";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        console.log(fields);
    })
};

function dropTabe(con) {
    var sql = "DROP TABLE IF EXISTS customers1";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("table Deleted");
    })
};

function updateData(con) {
    var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345' ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " Records updated ");
    })
}

