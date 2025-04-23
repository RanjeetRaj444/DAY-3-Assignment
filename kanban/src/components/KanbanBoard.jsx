import React, { useState, useEffect } from 'react';
import Column from './Column';
import { v4 as uuidv4 } from 'uuid';

const KanbanBoard = () => {
  // State to store tasks in each column
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage if they exist
  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem('todo')) || [];
    const storedInProgress = JSON.parse(localStorage.getItem('inProgress')) || [];
    const storedDone = JSON.parse(localStorage.getItem('done')) || [];
    
    setTodo(storedTodo);
    setInProgress(storedInProgress);
    setDone(storedDone);
  }, []);

  // Save tasks to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('inProgress', JSON.stringify(inProgress));
    localStorage.setItem('done', JSON.stringify(done));
  }, [todo, inProgress, done]);

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = { id: uuidv4(), title: newTask };
      setTodo([...todo, newTaskObj]);
      setNewTask('');
    }
  };

  // Handle drag-and-drop task update
  const handleDragEnd = (e, columnFrom, columnTo) => {
    const taskId = e.dataTransfer.getData('taskId');
    const draggedTask = columnFrom.find(task => task.id === taskId);

    if (draggedTask) {
      columnFrom.splice(columnFrom.indexOf(draggedTask), 1);
      columnTo.push(draggedTask);

      setTodo([...todo]);
      setInProgress([...inProgress]);
      setDone([...done]);
    }
  };

  return (
    <div className="kanban-board">
      <h2>Kanban Board</h2>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="Add new task..." 
      />
      <button onClick={handleAddTask}>Add Task</button>

      <div className="columns-container">
        <Column 
          title="Todo"
          tasks={todo}
          onDragEnd={(e) => handleDragEnd(e, todo, inProgress)}
        />
        <Column 
          title="In Progress"
          tasks={inProgress}
          onDragEnd={(e) => handleDragEnd(e, inProgress, done)}
        />
        <Column 
          title="Done"
          tasks={done}
          onDragEnd={(e) => handleDragEnd(e, done, todo)}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
