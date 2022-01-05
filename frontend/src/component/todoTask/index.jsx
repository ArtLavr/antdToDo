import React, { useState } from "react"
import Form from "../form"
import { shouldUpdateTodosState } from "../../recoil/atoms"
import { useSetRecoilState } from "recoil"
import "./index.scss"
import PropTypes from "prop-types"
import { Button, Checkbox } from "antd"

function TodoTask(props) {
  const setShouldUpdateTodos = useSetRecoilState(shouldUpdateTodosState)
  const [openEdit, setOpenEdit] = useState(false)

  function edit(todoId, formText) {
    fetch(`http://localhost:7000/todoData/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: formText
      })
    })
      .then((data) => {
        console.log(data)
        return data.json()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function editTodoChecked(todoId, checked) {
    fetch(`http://192.168.1.5:7000/todoData/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        checked: !checked
      })
    })
      .then((data) => {
        return data.json()
      })
      .then(() => {
        setShouldUpdateTodos(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      {openEdit ? (
        <Form
          id={props.todo._id}
          query="patch"
          submit={edit}
          setOpenEdit={setOpenEdit}
          name="Update"
          formTextValue={props.todo.description}
        />
      ) : (
        <div className="todoTask">
          <Checkbox
            checked={props.todo.checked}
            id={props.todo.id}
            onChange={() => {
              editTodoChecked(props.todo._id, props.todo.checked)
            }}
          />

          <p className={props.todo.checked ? "checked-todo" : ""}>{props.todo.description}</p>
          <Button className="margin-left-button" type="primary" onClick={() => setOpenEdit(true)}>
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              fetch(`http://localhost:7000/todoData/${props.todo._id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then((data) => {
                  console.log(data)
                  return data.json()
                })
                .catch((err) => {
                  console.log(err)
                })
              setShouldUpdateTodos(true)
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </>
  )
}

export default TodoTask

TodoTask.propTypes = {
  todo: PropTypes.object
}
