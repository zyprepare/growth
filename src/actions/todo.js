import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from '../constants/todo';

let nextTodoId = 0;

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, id: nextTodoId++, text };
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
