import "./App.scss"
import React from "react"
import { useEffect } from "react"
import Form from "./component/form"
import TodoList from "./component/todoList"
import { useRecoilState } from "recoil"
import { activeNewTaskMenuState, shouldUpdateTodosState, todoListState } from "./recoil/atoms"
import { ReactComponent as Plus } from "./img/plus.svg"

function App() {
  const [activeNewTaskMenu, setActiveNewTaskMenu] = useRecoilState(activeNewTaskMenuState)
  const [shouldUpdateTodos, setShouldUpdateTodos] = useRecoilState(shouldUpdateTodosState)
  // eslint-disable-next-line
  const [todoList, setTodoList] = useRecoilState(todoListState)

  function newTodo(formText) {
    fetch("http://localhost:7000/todoData", {
      method: "POST",
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

  useEffect(() => {
    fetch("http://localhost:7000/todoData", {
      method: "GET"
    })
      .then((data) => {
        console.log(data)
        return data.json()
      })
      .then((data) => {
        console.log(data)
        setTodoList(data)
      })
      .catch((err) => {
        console.log(err)
      })
    setShouldUpdateTodos(false)
  }, [shouldUpdateTodos])

  return (
    <div className="App">
      <h1>Todolist</h1>
      {activeNewTaskMenu ? (
        <Form
          query="post"
          className="App__form"
          submit={newTodo}
          name="Add"
          setActiveNewTaskMenu={setActiveNewTaskMenu}
        />
      ) : (
        <div className="App__add-task" onClick={() => setActiveNewTaskMenu(true)}>
          <button className="App__add-task__plus-icon">
            <Plus />
          </button>
          <h2>Add task</h2>
        </div>
      )}
      <TodoList allTodos={todoList} />
    </div>
  )
}

export default App
