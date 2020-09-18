import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { DateTimePicker } from "@material-ui/pickers";
import EventIcon from "@material-ui/icons/Event";
import { IconButton, InputAdornment } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  customStyles,
  materialTheme,
  useStyles,
} from "../../styles/materialStyles";
import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
} from "../../actions/events";

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const final = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: final.toDate(),
};

const CalendarModal = () => {
  const classes = useStyles();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(final.toDate());

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({ ...formValues, start: e });
  };

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({ ...formValues, end: e });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "Start date has to be greater than End date",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return Swal.fire(
        "Error",
        "You need to add the Title of the event",
        "error"
      );
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Edgar",
          },
        })
      );
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      closeTimeoutMS={250}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? "Editar Evento" : "Nuevo Evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label className="d-block">Start Date and Hour</label>
          <ThemeProvider theme={materialTheme}>
            <DateTimePicker
              className={classes.root}
              variant="dialog"
              ampm={true}
              minDate={dateStart}
              value={dateStart}
              onChange={handleStartDateChange}
              disablePast
              showTodayButton
              format="yyyy/MM/DD HH:mm"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ThemeProvider>
        </div>

        <div className="form-group">
          <label className="d-block">End Date and Hour</label>
          <ThemeProvider theme={materialTheme}>
            <DateTimePicker
              className={classes.root}
              variant="dialog"
              ampm={true}
              minDate={dateEnd}
              value={dateEnd}
              error={moment(dateStart).isSameOrAfter(moment(dateEnd))}
              helperText={
                moment(dateStart).isSameOrAfter(moment(dateEnd)) &&
                "Date has to be greater than start date"
              }
              onChange={handleEndDateChange}
              disablePast
              showTodayButton
              format="yyyy/MM/DD HH:mm"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ThemeProvider>
        </div>

        <hr />
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className={`form-control ${
              title.length > 1 ? "is-valid" : "is-invalid"
            }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            A brief description
          </small>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional Information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-block"
          onClick={closeModal}
        >
          <i className="far fa-window-close"></i>
          <span> Cancel</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
