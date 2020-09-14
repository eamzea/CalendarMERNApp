import React from "react";

const CalendarEvent = ({ event }) => {
  const {
    title,
    user: { name },
  } = event;

  return (
    <div>
      <strong>{title}</strong>
      <br />
      <span>{name}</span>
    </div>
  );
};

export default CalendarEvent;
