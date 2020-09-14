import React, { useState } from "react";
import NavbarCalendar from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

moment.locale("es");

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Cumpleaños",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Comprar Pastel",
    user: {
      _id: 123,
      name: "Edgar",
    },
  },
];

const CalendarScreen = () => {
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367cf7",
      opacity: 0.8,
      displa: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="calendar-screen">
        <NavbarCalendar />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onView={onViewChange}
          view={lastView}
          toolbar={true}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
        />
        <CalendarModal />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default CalendarScreen;
