import React, { useEffect, useState } from "react"
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native"
import Task from "./components/Task"
import SERVER_URL from "./url"

export const Example = () => {
  const [shouldUpdateTodos, setShouldUpdateTodos] = useState([false])
  const [todoList, setTodoList] = React.useState([])
  const [inputValue, setInputValue] = React.useState("")

  const addItem = (formText) => {
    if (formText === undefined || formText === "") {
      return alert("Заполните поле")
    }
    fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: formText
      })
    })
      .then((data) => {
        // console.log(data)
        return data.json()
      })
      .catch((err) => {
        console.log(err)
      })
    setInputValue("")
    setShouldUpdateTodos(true)
  }

  useEffect(() => {
    fetch(SERVER_URL, {
      method: "GET"
    })
      .then((data) => {
        // console.log(data)
        return data.json()
      })
      .then((data) => {
        // console.log(data)
        setTodoList(data)
      })
      .catch((err) => {
        console.log(err)
      })
    setShouldUpdateTodos(false)
  }, [shouldUpdateTodos])
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {todoList.map((todo) => (
              <Task key={todo._id} todo={todo} setShouldUpdateTodos={setShouldUpdateTodos} />
            ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity onPress={() => addItem(inputValue)}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}
export default Example

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED"
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1
  }
})
