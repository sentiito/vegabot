//Connexion MYSQL
const mysql = require('mysql');
var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'vegalife',
    insecureAuth : true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("T'es co bg");
    
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
});