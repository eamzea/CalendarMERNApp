import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { DateTimePicker } from "@material-ui/pickers";
import EventIcon from "@material-ui/icons/Event";
import { IconButton, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#343a40",
      },
    },
    MuiPickerDTTabs: {
      tabs: {
        backgroundColor: "#343a40",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#191919",
        "&hover": {
          backgroundColor: "#343a40",
        },
      },
      daySelected: {
        backgroundColor: "#636a72",
        "&:hover": {
          backgroundColor: "#343a40",
        },
      },
      dayDisabled: {
        color: "#0000002b",
      },
      current: {
        color: "#343a40",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#343a40",
      },
    },
    MuiButton: {
      textPrimary: {
        color: "#343a40",
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: "#636a72",
      },
      thumb: {
        border: "14px solid #636a72",
      },
      noPoint: {
        backgroundColor: "#636a72",
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: "#636a72",
      },
    },
  },
});

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const final = now.clone().add(1, "hours");

const CalendarModal = () => {
  const classes = useStyles();

  const { modalOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(final.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: now.toDate(),
    end: final.toDate(),
  });

  const { title, notes, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    if (target.value.length < 2) {
      setTitleValid(false);
    } else {
      setTitleValid(true);
    }
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
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
      return setTitleValid(false);
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      closeTimeoutMS={500}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> New Event </h1>
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
              onError={console.log}
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
              onChange={handleEndDateChange}
              onError={console.log}
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
            className={`form-control ${titleValid ? "is-valid" : "is-invalid"}`}
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
          type="submit"
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
