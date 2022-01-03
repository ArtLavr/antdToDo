import TodoTask from '../todoTask';
import './index.scss';

function TodoList(props) {
  return (
    <div className='todoLists'>
      {/* {console.log(props.allTodos)} */}
      {props.allTodos.map((todo) => (
        <TodoTask todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
