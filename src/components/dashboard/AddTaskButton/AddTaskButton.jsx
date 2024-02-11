"use client"
import { IconButton } from '@/components/shared';
import PropTypes from 'prop-types'
import styles from "./AddTaskButton.module.css";
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

export const AddTaskButton = ({onClick}) => {
  const {handleOpenModal} = useContext(AppContext);

  const handleClick = () => {
    handleOpenModal();
  }

  return (
    <div className={styles.main}>
      <IconButton icon="add" variant="filled" onClick={handleClick} />
      <p>Add New Task</p>
    </div>
  );
}

AddTaskButton.propTypes = {
  onClick: PropTypes.func
}