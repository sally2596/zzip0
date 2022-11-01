// @ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';

// recoil
import { useSetRecoilState } from 'recoil';
import { todosState } from '../../../lib/recoil/todo';

// mui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const TodoItem = ({ data }) => {
  const setTodos = useSetRecoilState(todosState);
  const setTodoItems = useSetRecoilState(todoTimerState);
  const [completed, setCompleted] = useState(false);

  const handleCheck = (e) => {
    setCompleted(e.target.checked);
  };

  const removeTodo = () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== data.id));
  };

  const addTodoItem = (data) => {
    setTodoItems((data) =>
      data.concat({
        id: getId(),
        subject: data.subject,
        content: data.content,
        time: ''
      })
    );
    console.log({ ...data, time: '' });
  };

  return (
    <div>
      <TodoItemsContainer>
        <div>
          <Checkbox onChange={(e) => handleCheck(e)} />
          {data.subject} / {data.content}
        </div>
        <div>
          <button>add</button>
          <IconButton
            aria-label="delete"
            onClick={removeTodo}
            size="small"
            sx={{ marginTop: 0.7 }}
          >
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </div>
      </TodoItemsContainer>
    </div>
  );
};

const TodoItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default TodoItem;
