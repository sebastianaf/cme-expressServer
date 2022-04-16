const mysql = require("mysql")

exports.conexion = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "tienda"
})


