const express = require("express")
const todoRoute = require("./routes/to-do-routes")
const bodyparse = require("body-parser")
const cors = require("cors")
const app = express()
app.use(bodyparse.json())

app.use("/", todoRoute)

module.exports = app