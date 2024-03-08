const express = require("express")
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const userrouter = require('./routes/userrouter')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use('/', userrouter)



app.listen(4550, () => {
    console.log("server is running on port 4550")
})