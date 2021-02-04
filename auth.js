const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan" //wajib sama dengan index.js
auth = (req, res, next) => {
    let header = req.headers.authorization //barior token
    let token = header && header.split(" ")[1] //untuk memisahkan token yang mana yang ngga mana

    let jwtHeader = {
        algorithm: "HS256" //boleh diganti lihat di webnya saja
    }
    if(token == null){
        res.status(401).json({ message: "Unauthorized"}) //mengidentifikasi token yang di inputkan
    }else{
        jwt.verify(token, SECRET_KEY, jwtHeader, (error,user) => {
            if (error) {
                res
                .status(401)
                .json({
                    message: "Invalid token"
                }) //if jika token salah maka invalid token
            } else {
                console.log(user);
                next()
            } //jika token benar maka akan next ke step berikutnya
        })
    } 
}

module.exports = auth
