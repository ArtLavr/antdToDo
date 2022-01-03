import React, { useState } from 'react';
import Form from '../form';
import { useRecoilState } from 'recoil';
import { todoListState } from '../../recoil/atoms';
import { hashtagListState } from '../../recoil/atoms';
import './index.scss';
import { Button, Checkbox } from 'antd';

function TodoTask(props) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [hashtagList, setHashtagList] = useRecoilState(hashtagListState);
  const [openEdit, setOpenEdit] = useState(false);

  function edit(todoList, formText, setTodoList) {
    const currentHasgtagsArray = formText.match(/#\S+/g);
    currentHasgtagsArray &&
      currentHasgtagsArray.map((hashtag) =>
        hashtagList.includes(hashtag)
          ? null
          : setHashtagList((oldValue) => [...oldValue, hashtag])
      );
    setTodoList([
      ...todoList.map((todo) =>
        todo.id === props.todo.id
          ? { ...props.todo, description: formText }
          : todo
      ),
    ]);
  }
  return (
    <>
      {openEdit ? (
        <Form
          submit={edit}
          setOpenEdit={setOpenEdit}
          name='Update'
          formTextValue={props.todo.description}
        />
      ) : (
        <div className='todoTask'>
          {/* <input type="radio" name="" id="" /> */}
          <Checkbox
            checked={props.todo.checked}
            id={props.todo.id}
            onChange={(e) => {
              // console.log(e.target.id);
              // console.log(todoList);
              // console.log([
              //   ...todoList.map((todo) =>
              //     todo.id === e.target.id ? { ...todo, checked: false } : todo
              //   ),
              // ]);
              setTodoList([
                ...todoList.map((todo) =>
                  todo.id === e.target.id
                    ? { ...todo, checked: !todo.checked }
                    : todo
                ),
              ]);
            }}
          />

          <p className={props.todo.checked ? 'checked-todo' : ''}>
            {props.todo.description}
          </p>
          <Button
            className='margin-left-button'
            type='primary'
            onClick={() => setOpenEdit(true)}
          >
            Edit
          </Button>
          <Button
            type='primary'
            onClick={() => {
              setTodoList([
                ...todoList.filter((todo) => todo.id !== props.todo.id),
              ]);
            }}
          >
            Delete
          </Button>

          {/* <button className='mainButton' onClick={() => setOpenEdit(true)}>
            Edit
          </button> */}
        </div>
      )}
    </>
  );
}

export default TodoTask;
