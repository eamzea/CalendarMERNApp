import React from "react";

const CalendarEvent = ({ event }) => {
  const {
    title,
    user: { name },
  } = event;

  return (
    <div>
      <p>
        <strong>{title}</strong> - <span>{name}</span>
      </p>
    </div>
  );
};

export default CalendarEvent;
