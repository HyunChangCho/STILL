/* 
  할 일 목록을 관리하고 렌더링하는 주요 컴포넌트입니다.
  상태 관리를 위해 `useState` 훅을 사용하여 할 일 목록과 입력값을 관리합니다.
  할 일 목록의 추가, 삭제, 완료 상태 변경 등의 기능을 구현하였습니다.
*/
"use client";

import React, { useState } from "react";
import TodoItem from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-darkgrey rounded-lg shadow-md flex flex-col items-center">
      <h1 className="text-center font-medium text-xl mb-6">Todo List</h1>
      <Input
        type="text"
        // className="w-full p-3 mb-4 border-2 border-blue-500 rounded-full outline-none text-base"
        className="p-3 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        // className="px-5 py-2 bg-blue-500 text-white rounded-full cursor-pointer transition-colors duration-300 hover:bg-white hover:text-blue-500 hover:border-2 hover:border-blue-500"
        className="py-2 mb-4"
        onClick={addTodo}
      >
        Add To do
      </Button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
