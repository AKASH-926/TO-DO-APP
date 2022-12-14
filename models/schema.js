const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    work: { type: String, required: true },
    date: { type: Date }
})
const TodoDB = mongoose.model("TodoDB", TodoSchema)

module.exports = TodoDB