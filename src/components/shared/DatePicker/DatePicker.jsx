"use client";

import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { usePopper } from "@/hooks";
import { formatDate } from "@/utils/helpers/formatDate";
import { MatIcon } from "@/components/ui";
import { RenderWhen } from "..";
import PropTypes from "prop-types";
import styles from "./DatePicker.module.css";

export const DatePicker = ({
  label,
  id,
  name,
  register,
  setValue,
  placeholder,
  ...restOfProps
}) => {
  const refEl = useRef(null);
  const popperRef = useRef(null);
  const [selected, setSelected] = useState(new Date());
  const { isPopperOpen, togglePopper } = usePopper(refEl, popperRef);

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setValue(name, formatDate(date, "PP"));
    } else {
      setValue(name, "");
    }
    togglePopper();
  };

  return (
    <div ref={refEl} className={styles.input_group}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.form_input}>
        <input
          type="text"
          id={id}
          name={name}
          onClick={togglePopper}
          placeholder={placeholder}
          readOnly
          {...register(name)}
          {...restOfProps}
        />
        <p className={styles.date_picker_icon} onClick={togglePopper}>
          <MatIcon iconName="event" />
        </p>
      </div>
      <RenderWhen condition={isPopperOpen}>
        <div
          ref={popperRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{ zIndex: 5 }}
        >
          <div className={styles.date_picker_container}>
            <DayPicker
              initialMonth={selected || new Date()}
              selected={selected}
              onDayClick={handleDaySelect}
              modifiersClassNames={{
                selected: styles.date_picker_selected,
                today: styles.date_picker_today,
              }}
            />
          </div>
        </div>
      </RenderWhen>
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};
