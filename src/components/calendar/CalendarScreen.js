import React, { useEffect, useState } from "react";
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
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("en");

const localizer = momentLocalizer(moment);

let formats = {
  timeGutterFormat: "HH:mm",
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "HH:mm") + " — " + localizer.format(end, "HH:mm"),
  agendaTimeFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "HH:mm") + " — " + localizer.format(end, "HH:mm"),
  agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "HH:mm") + " — " + localizer.format(end, "HH:mm"),
};

const CalendarScreen = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

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
      backgroundColor: uid === event.user._id ? "#367cf7" : "#465650",
      opacity: 0.9,
      display: "block",
      color: "white",
      border: `2px solid ${uid === event.user._id ? "#2560c8" : "#1f2120"}`,
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
          formats={formats}
        />
        <CalendarModal />
        {activeEvent && <DeleteEventFab />}
        <AddNewFab />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default CalendarScreen;
