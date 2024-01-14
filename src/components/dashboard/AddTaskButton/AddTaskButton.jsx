import { IconButton } from '@/components/shared';
import PropTypes from 'prop-types'
import styles from "./AddTaskButton.module.css";

export const AddTaskButton = ({onClick}) => {
  return (
    <div className={styles.main}>
      <IconButton icon="add" variant="filled" onClick={onClick} />
      <p>Add New Task</p>
    </div>
  );
}

AddTaskButton.propTypes = {
  onClick: PropTypes.func.isRequired
}