import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore'; // Firebase의 firestore 모듈을 추가합니다.
import { db } from '@/firebase'; // Firebase 인스턴스를 가져옵니다.

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [dueDate, setDueDate] = useState(todo.dueDate || ''); // 기존 todo에 저장된 날짜를 초기값으로 설정합니다.

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleConfirmDate = async () => {
    const todoDoc = doc(db, 'todos', todo.id); // todoCollection에 해당하는 'todos' 컬렉션의 문서를 참조합니다.
    await updateDoc(todoDoc, { dueDate }); // 해당 문서의 dueDate 필드를 업데이트합니다.
  };

  return (
    <li className="flex items-center justify-between w-full mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 cursor-pointer"
          checked={todo.completed}
          onChange={onToggle}
        />
        <p className={`${todo.completed ? 'line-through' : ''}`}>{todo.text}</p>
      </div>
      <div className="flex items-center">
        <input
          type="date"
          className="mr-2 p-1 rounded"
          value={dueDate} // dueDate 상태를 바로 사용합니다.
          onChange={handleDateChange} // 입력값이 변경될 때마다 상태를 업데이트합니다.
        />
        <button className="text-red-500" onClick={onDelete}>Delete</button>
        <button className="ml-2 text-green-500" onClick={handleConfirmDate}>Confirm Date</button> {/* 날짜를 확정하는 버튼 */}
      </div>
    </li>
  );
};

export default TodoItem;
