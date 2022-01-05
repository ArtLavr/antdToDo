import React, { useState } from "react"
import {
  CheckBox,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Pressable,
  TextInput
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import SERVER_URL from "../url"

const Task = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [inputValue, setInputValue] = useState(props.todo.description || "")
  const deleteTodo = (id) => {
    fetch(SERVER_URL + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => {
        return data.json()
      })
      .catch((err) => {
        console.log(err)
      })
    props.setShouldUpdateTodos(true)
  }
  function editTodoChecked(todoId, checked) {
    fetch(SERVER_URL + `/${todoId}`, {
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
        props.setShouldUpdateTodos(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function editTodoDescription(todoId, description) {
    if (description === undefined || description === "") {
      return alert("Заполните поле")
    }
    fetch(`http://192.168.1.5:7000/todoData/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: description
      })
    })
      .then((data) => {
        return data.json()
      })
      .then(() => {
        props.setShouldUpdateTodos(true)
      })
      .catch((err) => {
        console.log(err)
      })
    setShowModal(false)
  }

  return (
    <View style={styles.item}>
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => {
          setInputValue(props.todo.description)
          setShowModal(false)
        }}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <Pressable
            onPress={() => editTodoDescription(props.todo._id, inputValue)}
            style={styles.button}
          >
            <Text>Save</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.itemLeft}>
        <CheckBox
          value={props.todo.checked}
          onValueChange={() => editTodoChecked(props.todo._id, props.todo.checked)}
        />
        <Text style={[props.todo.checked === true ? styles.lineThrough : "", styles.itemText]}>
          {props.todo.description}
        </Text>
      </View>
      <TouchableHighlight style={styles.itemRight} onPress={() => setShowModal(true)}>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableHighlight>
      <TouchableHighlight onPress={() => deleteTodo(props.todo._id)}>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  lineThrough: {
    textDecorationLine: "line-through"
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "rgba(171 ,245 ,235 , 0.85)"
  },

  modalView: {
    margin: 100,
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "100%"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  itemRight: {
    marginLeft: "auto",
    marginRight: 10
  },
  itemText: {
    maxWidth: "80%"
  }
})

export default Task
