"use client";

import { IconButton, Menu, MenuItem, Popper } from "@/components/shared";
import { usePopper } from "@/hooks";
import { TASK_SORT_OPTIONS } from "@/lib/constants";
import { useRef } from "react";
import styles from "./SortTaskListButton.module.css";

const { LATEST, OLDEST, DUE_DATE, PRIORITY_HIGH, PRIORITY_LOW } =
  TASK_SORT_OPTIONS;

const sortOptions = [
  { label: "Latest", value: LATEST },
  { label: "Oldest", value: OLDEST },
  { label: "Due Date", value: DUE_DATE },
  { label: "Priority High", value: PRIORITY_HIGH },
  { label: "Priority Low", value: PRIORITY_LOW },
];

export const SortTaskListButton = ({ onSelect, selectedOption }) => {

  const refEl = useRef(null);
  const popperRef = useRef(null);
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  return (
    <div ref={refEl} className={styles.sort_btn}>
      <small>{selectedOption.label}</small>
      <IconButton size="small" onClick={togglePopper}>
        <span className="material-icons">swap_vert</span>
      </IconButton>
      <Popper open={isPopperOpen} ref={popperRef} onClose={togglePopper}>
        <Menu>
          {sortOptions.map((option) => (
            <MenuItem key={option.value} onClick={() => onSelect(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Popper>
    </div>
  );
};
