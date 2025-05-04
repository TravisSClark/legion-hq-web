import React, { useState, useEffect } from 'react';
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}



const ItemList = React.memo(function ItemList({ draggableItems }) {
  return draggableItems.map((item, index) => (
    <Draggable key={item.id} id={item.id} index={index}>
      {item.component}
    </Draggable>
  ));
});

function DragDropContainer({ items, reorderUnits }) {
  const [draggableItems, setDraggableItems] = useState(items);
  useEffect(() => {
    setDraggableItems(items);
  }, [items]);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(pointerSensor);

  function onDragEnd(result) {
    console.log('dragend', result);
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const newItems = reorder(
      draggableItems,
      result.source.index,
      result.destination.index
    );
    reorderUnits(result.source.index, result.destination.index);
    setDraggableItems(newItems);
  }
  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        <div style={{display:'flex', flexDirection:'column'}}>
          <ItemList draggableItems={draggableItems} />
          </div>
      </Droppable>
    </DndContext>
  );
};

export default DragDropContainer;
