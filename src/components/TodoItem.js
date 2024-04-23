/*
  각각의 할 일 항목을 렌더링하는 컴포넌트입니다.
  각 할 일의 완료 상태에 따라 체크박스와 텍스트 스타일을 동기화하며,
  삭제 버튼을 통해 해당 할 일을 삭제할 수 있습니다.
  이 컴포넌트는 `TodoList.js`에서 사용되어 할 일 목록을 구성합니다.
*/
import React from "react";
import { Button } from "@/components/ui/button";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between w-full mb-4 p-2 bg-gray-0 rounded-md shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="form-checkbox h-5 w-5 text-blue-1"
      />
      <span
        className={`flex-grow mx-2 ${todo.completed ? "line-through" : ""}`}
      >
        {todo.text}
      </span>
      <Button
        // className="ml-2 bg-red-500 font-bold text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700"
        onClick={onDelete}
      >
        DELETE
      </Button>
    </li>
  );
};

export default TodoItem;
