require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const allDAO = require('./dao/all')
const cors = require("cors");
const db = require('./models')
const userService = require('./service/userService')
const session = require('./middleware/session')
const routes = require('./routes/route')

const jwt = require('jsonwebtoken');

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(session)
app.use(routes)


var corsOptions = {
    origin: "http://localhost:8001"
}



app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/json", (req, res) => {
  res.json({ message: "Welcome to rizki application." });
});

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});

app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

app.listen(PORT, async() => {
    try {
        await allDAO.createAllTable()
        console.log(`LISTEN PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
}) 
  