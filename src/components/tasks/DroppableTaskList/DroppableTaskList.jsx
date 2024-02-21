import {  Droppable } from "react-beautiful-dnd";
import { DraggableTask } from "../DraggableTask/DraggableTask";
import PropTypes from "prop-types";
import styles from "./DroppableTaskList.module.css";

export const DroppableTaskList = ({ listId, sortedTasks }) => {
  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles.tasks_container}
        >
          {sortedTasks.map((task, index) => (
            <DraggableTask key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

DroppableTaskList.propTypes = {
  listId: PropTypes.string.isRequired,
  sortedTasks: PropTypes.array.isRequired,
};