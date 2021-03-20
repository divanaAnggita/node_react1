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

//base url -> http://localhost:2000/pelanggaran_siswa
const pelanggaran_siswa = require("./route/pelanggaran_siswa")
app.use("/pelanggaran_siswa", auth, pelanggaran_siswa)

//base url 
const detail_pelanggaran_siswa = require("./route/detail_pelanggaran_siswa")
app.use("/detail_pelanggaran_siswa", auth, detail_pelanggaran_siswa)

//jurusan
const jurusan = require("./route/jurusan")
app.use("/jurusan", auth, jurusan)

//membuat web server dengan port 2000
app.listen(2000, () => {
    console.log("server run on port 2000")
})
