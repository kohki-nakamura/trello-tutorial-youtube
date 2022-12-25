import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import dummyData from '../dummyData';
import Card from './Card';

const Main = () => {
  const [data, setData] = useState(dummyData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 同じカラム内での入れ替え
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const sourceCol = data[sourceColIndex];
    const sourceTask = [...sourceCol.tasks];
    // タスクを削除
    const [removed] = sourceTask.splice(source.index, 1);
    // タスクを追加
    sourceTask.splice(destination.index, 0, removed);
    data[sourceColIndex].tasks = sourceTask;
    setData(data);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{section.title}</div>
                <div className="trello-section-content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.3" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default Main