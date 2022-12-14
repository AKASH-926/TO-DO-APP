const express = require("express")

const app = require("./app")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/todoDATA", () => {
    console.log("connected to DB")
})

app.listen(8080, () => {
    console.log("server up at 8080")
})