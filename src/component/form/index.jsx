import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../../recoil/atoms';
import { Form, Input, Button } from 'antd';
import './index.scss';

function TodoForm(props) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [formText, setFormText] = useState(props.formTextValue || '');
  return (
    <Form
      className={`${props.className || ''}  form`}
      onFinish={(e) => {
        console.log(e);
        // e.preventDefault();
        props.submit(todoList, formText, setTodoList);
        // console.log(props.setOpenEdit);
        setFormText('');
        props.setOpenEdit && props.setOpenEdit(false);
        props.setActiveNewTaskMenu && props.setActiveNewTaskMenu(false);
      }}
      initialValues={{
        text: formText,
      }}
      // onFinish={(values) => {
      //   console.log('Success:', values);
      // }}
    >
      <Form.Item
        name='text'
        label='text'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          onChange={(e) => setFormText(e.target.value)}
          value={formText}
          placeholder='Text'
        />
      </Form.Item>
      {/* <input
        type='text'
        value={formText}
        onChange={(e) => setFormText(e.target.value)}
        required
        placeholder='Text'
      /> */}
      <Button type='primary' className='mainButton' htmlType='submit'>
        {props.name}
      </Button>
    </Form>
  );
}

export default TodoForm;
