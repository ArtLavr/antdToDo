import './App.scss';
import Form from './component/form';
import TodoList from './component/todoList';
import HashtagList from './component/hashtagList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState } from './recoil/atoms';
import { hashtagListState } from './recoil/atoms';
import { activeHashtagState } from './recoil/atoms';
import { activeNewTaskMenuState } from './recoil/atoms';
import { ReactComponent as Plus } from './img/plus.svg';

function App() {
  const [activeNewTaskMenu, setActiveNewTaskMenu] = useRecoilState(
    activeNewTaskMenuState
  );
  const activeHashtag = useRecoilValue(activeHashtagState);
  // eslint-disable-next-line
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [hashtagList, setHashtagList] = useRecoilState(hashtagListState);

  function newTodo(todoList, formText, setTodoList) {
    const currentHasgtagsArray = formText.match(/#\S+/g);
    // console.log(currentHasgtagsArray);
    // console.log(hashtagList);
    currentHasgtagsArray &&
      currentHasgtagsArray.map((hashtag) =>
        hashtagList.includes(hashtag)
          ? null
          : setHashtagList((oldValue) => [...oldValue, hashtag])
      );
    setTodoList([
      ...todoList,
      {
        id: Date.now(),
        description: formText,
      },
      // setActiveNewTaskMenu(false),
    ]);
  }

  return (
    <div className='App'>
      <h1>Todolist</h1>
      {activeNewTaskMenu ? (
        <Form
          className='App__form'
          submit={newTodo}
          name='Add'
          setActiveNewTaskMenu={setActiveNewTaskMenu}
        />
      ) : (
        <div
          className='App__add-task'
          onClick={() => setActiveNewTaskMenu(true)}
        >
          <button className='App__add-task__plus-icon'>
            <Plus />
          </button>
          <h2>Add task</h2>
        </div>
      )}
      <HashtagList allHashtags={hashtagList} />
      <TodoList
        allTodos={
          activeHashtag === '#all'
            ? todoList
            : todoList.filter((todo) =>
                todo.description.includes(activeHashtag)
              )
        }
      />
    </div>
  );
}

export default App;
