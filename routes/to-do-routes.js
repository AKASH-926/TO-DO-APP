const express = require("express").Router;
const TodoDB = require("../models/schema")

const todoRoute = express()

todoRoute.post("/add", (req, res) => {
    try {

    } catch (e) {

    }
})

todoRoute.get("/", (req, res) => {
    res.send("server working fine")
})

module.exports = todoRoute