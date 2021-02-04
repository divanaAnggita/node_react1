const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database
const md5 = require("md5") //mengubah password menjadi format md5 (untuk melindungi data user dari kebocoran data)
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//endpoint register
app.post("/register", (req,res) => {
    // prepare data
    let data = {
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password)
    } 
        //bedanya aray = baris data ada nomer nya seperti gerbong kereta
        //object = jenis jenis dari class, object satu kesatuan jika aray beda

    // create sql query insert
    let sql = "insert into user set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " user registered"
            }
        }
        res.json(response) // send response
    })
})

// endpoint login user (authentication)
app.post("/login", (req, res) => {
    // tampung username dan password
    let data = [
        req.body.username, //username
        md5(req.body.password) // password
    ]
    
    // create sql query
    let sql = "select * from user where username = ? and password = ?"

    // run query
    db.query(sql, data, (error, result) => {
        if (error) throw error

        // cek jumlah data hasil query
        if (result.length > 0) {
            // user tersedia
            let payload = JSON.stringify(result[0].id_user)
            // generate token
            let token = jwt.sign(payload, SECRET_KEY) // generate token
            res.json({
                logged: true,
                data: result,
                token: token
            })
        } 
        else {
            // user tidak tersedia
            res.json({
                message: "Invalid username/password"
            })
        }
    })
})

module.exports = app
