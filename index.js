//inisialisasi library
const express = require("express")
const app = express()
const auth = require("./auth")
const cors = require("cors")

app.use(
    cors({
        origin: '*',
        optionSuccessStatus: 200,
    })
);

const siswa = require("./route/siswa")
app.use("/siswa", auth, siswa)

const pelanggaran = require("./route/pelanggaran")
app.use("/pelanggaran", auth, pelanggaran)

//base url -> http:/localhost:2000/pegawai
//import route pegawai
const pegawai = require("./route/pegawai")
app.use("/pegawai", auth, pegawai)

const user = require("./route/user")
app.use("/", user)

//membuat web server dengan port 2000
app.listen(2000, () => {
    console.log("server run on port 2000")
})
