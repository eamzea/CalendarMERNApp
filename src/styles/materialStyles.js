import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export const materialTheme = createMuiTheme({
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
