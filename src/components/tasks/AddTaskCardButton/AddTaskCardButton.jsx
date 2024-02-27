import { AddTaskButton } from '..';
import styles from './AddTaskCardButton.module.css';

export const AddTaskCardButton = () => {

  return (
    <div className={styles.add_task_card}>
      <AddTaskButton buttonType="icon" />
    </div>
  );
}