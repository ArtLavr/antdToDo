import React, { useState } from "react"
import { shouldUpdateTodosState } from "../../recoil/atoms"
import { useSetRecoilState } from "recoil"
import { Form, Input, Button } from "antd"
import PropTypes from "prop-types"
import "./index.scss"

function TodoForm(props) {
  const setShouldUpdateTodos = useSetRecoilState(shouldUpdateTodosState)
  const [formText, setFormText] = useState(props.formTextValue || "")
  return (
    <Form
      className={`${props.className || ""}  form`}
      onFinish={
        (/* e */) => {
          switch (props.query) {
            case "patch":
              props.submit(props.id, formText)
              props.setOpenEdit && props.setOpenEdit(false)
              break
            case "post":
              props.submit(formText)
              props.setActiveNewTaskMenu && props.setActiveNewTaskMenu(false)
              break
          }
          setFormText("")
          setShouldUpdateTodos(true)
        }
      }
      initialValues={{
        text: formText
      }}
    >
      <Form.Item
        name="text"
        label="text"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input onChange={(e) => setFormText(e.target.value)} value={formText} placeholder="Text" />
      </Form.Item>
      <Button type="primary" className="mainButton" htmlType="submit">
        {props.name}
      </Button>
    </Form>
  )
}

export default TodoForm

TodoForm.propTypes = {
  query: PropTypes.string,
  formTextValue: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  setActiveNewTaskMenu: PropTypes.func,
  setOpenEdit: PropTypes.func,
  submit: PropTypes.func
}
