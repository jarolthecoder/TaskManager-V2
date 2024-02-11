"use client"
import { useContext } from "react";
import { Card, IconButton } from "..";
import styles from "./Modal.module.css";
import { AppContext } from "@/context/AppContext";

export const Modal = ({title, children}) => {

  const { modalOpen, handleCloseModal } = useContext(AppContext);

  if(!modalOpen) return null;

  return (
    <div className={styles.main}>
      <div className={styles.modal_content}>
        <Card>
          <div className={styles.modal_header}>
            <h2>{title}</h2>
            <IconButton icon="close" onClick={handleCloseModal} />
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
};
