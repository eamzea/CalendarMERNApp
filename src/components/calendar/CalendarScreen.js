import React, { useState } from "react";
import NavbarCalendar from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("en");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    console.log(e);
    dispatch(eventClearActiveEvent());
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
          // messages={messages}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onView={onViewChange}
          view={lastView}
          toolbar={true}
          selectable
          onSelectSlot={onSelectSlot}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
        />
        <CalendarModal />
        {activeEvent && <DeleteEventFab />}
        <AddNewFab />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default CalendarScreen;
