import { Draggable } from "react-beautiful-dnd";
import { TaskCard } from "..";

export const DraggableTask = ({task, index}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskCard task={task} />
        </div>
      )}
    </Draggable>
  );
};
