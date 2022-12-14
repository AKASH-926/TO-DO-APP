const express = require("express").Router;
const TodoDB = require("../models/schema")

const todoRoute = express()

todoRoute.get("/api", async (req, res) => {
    try {
        const todo = await TodoDB.find()
        res.status(200).json({
            status: "Fetched",
            todo: todo

        })
    } catch (e) {
        res.status(400).json({
            status: "failed to fetch",
            message: e.message
        })
    }
})
todoRoute.get("/api/:id", async (req, res) => {
    try {
        const todo = await TodoDB.findOne({ _id: req.params.id })
        res.status(200).json({
            status: "Fetched",
            todo: todo

        })
    } catch (e) {
        res.status(400).json({
            status: "failed to fetch",
            message: e.message
        })
    }
})
todoRoute.post("/api", async (req, res) => {
    try {
        const todo = await TodoDB.create({ work: req.body.work, date: Date.now() })
        res.status(200).json({
            status: "Posted",
            todo: todo

        })
    } catch (e) {
        res.status(400).json({
            status: "failed to post",
            message: e.message
        })
    }
})
todoRoute.put("/api/:id", async (req, res) => {
    try {
        const todo = await TodoDB.updateOne({ _id: req.params.id }, { work: req.body.work, date: Date.now() })
        res.status(200).json({
            status: "updated",
            todo: todo

        })
    } catch (e) {
        res.status(400).json({
            status: "failed to update",
            message: e.message
        })
    }
})
todoRoute.delete("/api/:id", async (req, res) => {
    try {
        const todo = await TodoDB.deleteOne({ _id: req.params.id })
        res.status(200).json({
            status: "deleted",
            todo: todo

        })
    } catch (e) {
        res.status(400).json({
            status: "failed to delete",
            message: e.message
        })
    }
})


todoRoute.get("/", (req, res) => {
    res.send("server working fine")
})

module.exports = todoRoute