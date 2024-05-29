let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('myDB');

const products = [
    { producttype: "case", productname: "Dumpling Hard Case", productimage: "hardcase1.jpg", productprice: 25, productid: 0, total: 25 },
    { producttype: "case", productname: "Dumpling Soft Case", productimage: "softcase1.jpg", productprice: 20, productid: 1, total: 20 },
    { producttype: "case", productname: "Boba Soft Case", productimage: "softcase2.jpg", productprice: 22, productid: 2, total: 22 },
    { producttype: "case", productname: "Boba Hard Case", productimage: "hardcase2.png", productprice: 21, productid: 3, total: 21 },

    { producttype: "cord", productname: "Dumpling Chain", productimage: "cord1.png",productprice: 10, productid: 4, total: 10 },
    { producttype: "cord", productname: "Dumpling Cord", productimage: "cord1.png", productprice: 10, productid: 5, total: 10 },
    { producttype: "cord", productname: "Boba Chain", productimage: "chain1.png", productprice: 10, productid: 6, total: 10 },
    { producttype: "cord", productname: "Boba Cord", productimage: "chain2.png", productprice: 10, productid: 7, total: 10 },

    { producttype: "cloth", productname: "Dumpling Cloth", productimage: "case.jpg", productprice: 8, productid: 8, total: 8 },
    { producttype: "cloth", productname: "Dumpling Spray", productimage: "case.jpg", productprice: 12, productid: 9, total: 12 },
    { producttype: "cloth", productname: "Boba Cloth", productimage: "case.jpg", productprice: 8, productid: 10, total: 8 },
    { producttype: "cloth", productname: "Boba Spray", productimage: "case.jpg", productprice: 12, productid: 11, total: 12 }
];

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, producttype TEXT, productname TEXT, productimage TEXT, productprice INT, total INT)");
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, firstname TEXT, surname TEXT, dob DATE, mobile TEXT, address1 TEXT, address2 TEXT, city TEXT, state TEXT, postcode TEXT)");
    
    let stmt = db.prepare("INSERT INTO products (producttype, productname, productimage, productprice, total) VALUES (?, ?, ?, ?, ?)");

    for (let product of products) {
        stmt.run(product.producttype, product.productname, product.productimage, product.productprice, product.total);
    }

    stmt.finalize();
    
    // db.run("DROP TABLE IF EXISTS products", function(err) {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    //     console.log('Table "products" deleted');
    // });
    
    // db.run("DROP TABLE IF EXISTS users", function(err) {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    //     console.log('Table "users" deleted');
    // });
    
});

db.close(function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database connection closed');
});




