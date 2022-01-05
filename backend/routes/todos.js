const express = require("express")
const router = express.Router()
const TodoData = require("../models/todo")

router.get("/:id", async (req, res) => {
  try {
    const todo = await TodoData.findById(req.params.id)
    res.json(todo)
  } catch (err) {
    res.send("Error " + err)
  }
})
router.get("/", async (req, res) => {
  try {
    const todos = await TodoData.find()
    res.json(todos)
  } catch (err) {
    res.send("Error " + err)
  }
})

router.post("/", async (req, res) => {
  const todo = new TodoData({
    checked: false,
    description: req.body.description
  })

  try {
    const result = await todo.save()
    res.json(result)
  } catch (err) {
    res.send("Error", err)
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const todo = await TodoData.findById(req.params.id)
    if (req.body.checked !== undefined) {
      todo.checked = req.body.checked
    }
    if (req.body.description !== undefined) {
      todo.description = req.body.description
    }

    const result = await todo.save()
    res.json(result)
  } catch (err) {
    console.log(err)
    res.send("Error")
  }
})
router.delete("/:id", async (req, res) => {
  try {
    TodoData.deleteOne({ _id: req.params.id })
      .then(() => res.json("deleted"))
      .catch((err) => res.json(err))
  } catch (err) {
    res.send("Error")
  }
})

module.exports = router
