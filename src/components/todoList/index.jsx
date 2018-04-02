import React from 'react';
import Proptypes from 'prop-types';
import Todo from '../todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {
      todos.map((todo, index) => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={
            () => onTodoClick(index)
          }
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.number.isRequired,
    completed: Proptypes.bool.isRequired,
    text: Proptypes.string.isRequired,
  }).isRequired).isRequired,
  onTodoClick: Proptypes.func.isRequired,
};

export default TodoList;
