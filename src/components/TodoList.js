/* 
  할 일 목록을 관리하고 렌더링하는 주요 컴포넌트입니다.
  상태 관리를 위해 `useState` 훅을 사용하여 할 일 목록과 입력값을 관리합니다.
  할 일 목록의 추가, 삭제, 완료 상태 변경 등의 기능을 구현하였습니다.
*/
"use client";


import React, { useState, useEffect } from "react";
import TodoItem from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  where,
} from "firebase/firestore";

const todoCollection = collection(db, "todos");

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    getTodos();
  }, [sortBy]);

  const getTodos = async () => {
    const q = sortBy
      ? query(todoCollection, orderBy("dueDate", sortBy), where("completed", "==", false))
      : query(todoCollection, where("completed", "==", false));

    const results = await getDocs(q);
    const newTodos = [];

    results.docs.forEach((doc) => {
      newTodos.push({ id: doc.id, ...doc.data() });
    });

    setTodos(newTodos);
  };

  const addTodo = async () => {
    if (input.trim() === "") return;

    const docref = await addDoc(todoCollection, {
      text: input,
      completed: false,
      dueDate: "",
    });

    setTodos([...todos, { id: docref.id, text: input, completed: false, dueDate: "" }]);
    setInput("");
  };

  const toggleTodo = async (id) => {
    const todoRef = doc(todoCollection, id);
    const todoSnapshot = await getDoc(todoRef);
  
    if (todoSnapshot.exists()) {
      const todoData = todoSnapshot.data();
      const updatedCompleted = !todoData.completed;
  
      await updateDoc(todoRef, { completed: updatedCompleted });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedCompleted } : todo
        )
      );
    } else {
      console.log('해당 문서가 존재하지 않습니다.');
    }
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(todoCollection, id);
    await deleteDoc(todoDoc);

    setTodos(
      todos.filter((todo) => todo.id !== id)
    );
  };

  const handleSortToggle = () => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-darkgrey rounded-lg shadow-md flex flex-col items-center">
      <h1 className="text-center font-medium text-xl mb-6">Todo List</h1>
      <Input
        type="text"
        className="p-3 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="py-2 mb-4" onClick={addTodo}>
        Add To do
      </Button>
      <Button className="py-2 mb-4" onClick={handleSortToggle}>
        {sortBy === "asc" ? "Sort by Date (Ascending)" : "Sort by Date (Descending)"}
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