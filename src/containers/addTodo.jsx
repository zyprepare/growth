import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { addTodo } from '../actions/todo';

const Temp = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">
          Add todo
        </button>
      </form>
    </div>
  );
};

Temp.propTypes = {
  dispatch: Proptypes.func.isRequired,
};

const AddTodo = connect()(Temp);

export default AddTodo;
