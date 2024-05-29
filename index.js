
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;


let db = new sqlite3.Database('myDB', (err) => {
    if (err) {
        console.error("Could not connect to database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('common'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {

    db.all("SELECT * FROM products", function (err, rows) {
        if (err) {
            return console.error(err.message);
        }
        if (rows.length === 0) {
            console.log("Array is empty!")

        } else {
            res.render('index', { 
                title: 'CuteSpecs',
                rows: rows 
            });
        }
    });
});

app.get("/product", function (req, res) {

    db.all("SELECT * FROM products", function (err, rows) {
        if (err) {
            return console.error(err.message);
        }
        if (rows.length === 0) {
            console.log("Array is empty!")

        } else {
            res.render('product', { 
                title: 'Product',
                rows: rows 
            });
        }
    });
});


app.get("/about", function (req, res) {

    res.render('about', { 
        title: 'About',
    });
      
});

app.get("/signup", function (req, res) {

    res.render('signup', { 
        title: 'signup',
    });
      
});


app.post("/signup", (req, res, next) => {
    const { inputEmail, inputPassword, inputFirstName, inputSurname, dob, mobile, inputAddress, inputAddress2, inputCity, inputState, inputpostcode } = req.body;

    db.serialize(() => {
        const stmt = db.prepare(`INSERT INTO users (email, password, firstname, surname, dob, mobile, address1, address2, city, state, postcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        stmt.run(inputEmail, inputPassword, inputFirstName, inputSurname, dob, mobile, inputAddress, inputAddress2, inputCity, inputState, inputpostcode, (err) => {
            if (err) {
                console.error("Error running statement:", err.message);
                return next(err);
            }

            console.log("Inserted user data into database");

            db.all("SELECT * FROM users", [], (err, rows) => {
                if (err) {
                    console.error("Error querying users table:", err.message);
                    return next(err);
                }

                console.log("Contents of the users table:");
                console.log(rows);

                res.render('signupsuccess', {
                    title: "Signup Success!",
                    name: inputFirstName 
                });
            });
        });
        stmt.finalize((err) => {
            if (err) {
                console.error("Error finalizing statement:", err.message);
                return next(err);
            }
            console.log("Statement finalized");
        });
    });
});



app.use((req, res) => {
    res.status(500).send("ERROR(500):TypeError: Cannot read properties of undefined");
});

app.use((req, res) => {
    res.status(404).send("ERROR(404): File not found");
});

app.use((error, request, response, next) => {
    let errorStatus = error.status || 500;
    response.status(errorStatus);
    response.send('ERROR(' + errorStatus + '):' + error.toString());
});

app.listen(port, () => {
    console.log(`Web server running at: http://localhost:${port}`);
    console.log(`Type Ctrl+C to shut down the web server`);
})
