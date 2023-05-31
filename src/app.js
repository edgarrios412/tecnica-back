const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.get("/", (req,res) => {
    res.send("HOLA MUNDO")
})

module.exports = app