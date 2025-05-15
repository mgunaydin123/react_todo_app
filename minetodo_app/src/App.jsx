import React, { useState } from 'react';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 800px;
  margin: 10px auto;
  background-color:rgb(54, 16, 68); 
  border-radius: 1rem;
  padding: 20px;
`;

const StyledTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #e55383; 
`;

const StyledForm = styled(Form)`
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const StyledInput = styled(Form.Control)`
  border-radius: 0.5rem 0 0 0.5rem;
  border-right: none;
  &:focus {
    border-color: #e55383;
    box-shadow: 0 0 0 3px rgba(229, 83, 131, 0.1);
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: #e55383;
  border-color: #e55383;
  &:hover {
    background-color: #d43d71;
    border-color: #d43d71;
  }
`;

const StyledListGroup = styled(ListGroup)`
  width: 100%;
  border: 1px solid #f0b2db; 
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 
  background-color: white;
`;

const TodoItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border-bottom: 2px solid #f0b2db;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    background-color: #fde6eb; 
    border-radius: 0.5rem;
  }
  transition: background-color 0.2s ease;
`;

const DeleteButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
    border-color: #c82333;
  }
`;

function TodoListApp() {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todoInput.trim() !== '') {
      setTodos([...todos, { text: todoInput, completed: false }]);
      setTodoInput('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <StyledContainer>
      <StyledTitle>Yapılacaklar Listesi</StyledTitle>

      {/* Form for input */}
      <StyledForm>
        <StyledInput
          type="text"
          id="todoInput"
          placeholder="Hedef"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          className="me-2"
        />
        <StyledButton variant="primary" onClick={addTodo}>
          Ekle
        </StyledButton>
      </StyledForm>

      {/* Todo list */}
      <StyledListGroup>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            onClick={() => toggleComplete(index)}
            className={todo.completed ? 'completed' : ''}
          >
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <DeleteButton
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(index);
              }}
            >
              Sil
            </DeleteButton>
          </TodoItem>
        ))}
      </StyledListGroup>
    </StyledContainer>
  );
}

export default TodoListApp;
