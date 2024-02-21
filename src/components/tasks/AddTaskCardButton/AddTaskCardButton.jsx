import { AddTaskButton } from '..';
import PropTypes from 'prop-types';
import classNames from "classnames";
import styles from './AddTaskCardButton.module.css';

export const AddTaskCardButton = ({ tasksLength }) => {

  const cardBtnClasses = classNames(
    styles.add_task_card,
    tasksLength === 0 && styles.no_margin
  );

  return (
    <div className={cardBtnClasses}>
      <AddTaskButton buttonType="icon" />
    </div>
  );
}

AddTaskButton.propTypes = {
  tasksLength: PropTypes.number.isRequired,
};