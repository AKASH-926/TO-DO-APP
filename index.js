const express = require("express")

const app = require("./app")
const mongoose = require("mongoose")
const port = process.env.PORT || 8080
mongoose.connect("mongodb+srv://AKASH:akashap@cluster0.hiv5i0f.mongodb.net/todoappdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log("connected to DB")
    })

app.listen(port, () => {
    console.log(`server up at ${port}`)
})