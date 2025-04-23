import React from 'react';
import Card from './Card';

const Column = ({ title, tasks, onDragEnd }) => {
  return (
    <div 
      className="column" 
      onDragOver={(e) => e.preventDefault()} 
      onDrop={(e) => onDragEnd(e)}
    >
      <h3>{title} ({tasks.length})</h3>
      <div>
        {tasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
