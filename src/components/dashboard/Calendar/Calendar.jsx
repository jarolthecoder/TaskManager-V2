'use client'

import { Card } from "@/components/shared";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./Calendar.module.css"
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";

const events = [
  {
    id: "1",
    title: "Meeting",
    start: "2024-01-22T10:30:00",
    end: "2024-01-23T11:30:00",
  },
  {
    id: "2",
    title: "Another Meeting",
    start: "2024-01-29",
    // end: "2024-01-29T10:30:00",
  },
  {
    id: "3",
    title: "New Meeting",
    start: "2024-01-25",
    end: "2024-01-26",
  },
];

export const Calendar = () => {
  return (
    <section className={styles.main}>
      <Card>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            listPlugin,
            timeGridPlugin,
          ]}
          initialView="dayGridMonth"
          // weekends={false}
          events={events}
          // initialEvents={[
          //   { title: "Meeting", start: "2024-01-22", end: "2024-01-23" },
          //   { title: "Another Meeting", start: "2024-01-29", end: "2024-01-30" },
          // ]}
          eventContent={renderEventContent}
          droppable={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          width="100%"
        />
      </Card>
    </section>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <span>{eventInfo.timeText}</span> */}
      <span>{eventInfo.event.title}</span>
    </>
  );
}