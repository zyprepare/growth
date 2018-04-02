import { connect } from 'react-redux';
import { toggleTodo } from '../actions/todo';
import TodoList from '../components/todoList';
import { VisibilityFilters } from '../constants/todo';

const getVisibileTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    case VisibilityFilters.SHOW_ALL:
    default:
      return todos;
  }
};

const mapStateToProps = state => ({
  todos: getVisibileTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = dispatch => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;
