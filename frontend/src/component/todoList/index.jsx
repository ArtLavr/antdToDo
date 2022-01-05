import TodoTask from "../todoTask"
import React from "react"
import PropTypes from "prop-types"
import "./index.scss"

function TodoList(props) {
  return (
    <div className="todoLists">
      {props.allTodos.map((todo) => (
        <TodoTask key={todo._id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList

TodoList.propTypes = {
  allTodos: PropTypes.array
}
