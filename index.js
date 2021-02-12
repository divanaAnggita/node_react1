//inisialisasi library
const express = require("express")
const app = express()
const auth = require("./auth")


//base url -> http:/localhost:2000/pegawai
//import route pegawai
const pegawai = require("./route/pegawai")
app.use("/pegawai", auth, pegawai)

const user = require("./route/user")
app.use("/",auth, user)

//membuat web server dengan port 2000
app.listen(2000, () => {
    console.log("server run on port 2000")
})
