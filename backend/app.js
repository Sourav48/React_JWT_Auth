const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
const SECRETKEY = "secretcode@123"
app.use(bodyParser.json())

app.post("/login", (req, res) => {

    console.log(req.body)
    const { username, password } = req.body

    if(username === "sourav" && password === "sourav"){
        const user = {
            username,
            age: 22
        }
        jwt.sign({user}, SECRETKEY, (err, token) => {
            if(err){
                res.sendStatus(403)
            }else{
                res.json({
                    token
                })
            }
        })
        
    }else{
        res.sendStatus(403)
    }
    
})

app.listen(8080, () => {
    console.log("Server started at port 8080")
})

