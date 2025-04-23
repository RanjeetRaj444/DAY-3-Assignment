import React from 'react';

const Card = ({ task }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div 
      className="card" 
      draggable 
      onDragStart={handleDragStart}
    >
      <p>{task.title}</p>
    </div>
  );
};

export default Card;
