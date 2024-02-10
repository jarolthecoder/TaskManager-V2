"use client";

import { DayPicker } from "react-day-picker";
import styles from "./Calendar.module.css";
import "react-day-picker/dist/style.css";

export const Calendar = () => {
  return (
    <DayPicker
      mode="single"
      onDayClick={(day) => console.log(day)}
      selected={new Date()}
      className={styles.rdp}
      modifiersClassNames={{
        selected: styles.selected,
        today: styles.today,
      }}
    />
  );
};
