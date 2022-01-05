const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model("todoData", todoSchema)
