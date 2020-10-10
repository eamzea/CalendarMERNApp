import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import CalendarModal from "../../../components/calendar/CalendarModal";
import moment from "moment";
import DateFnsUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../../../actions/events";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../../../actions/events", () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, "hours");
const final = now.clone().add(1, "hours");

const initState = {
  ui: {
    modalOpen: true,
  },
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola Test",
      notes: "Notas test",
      start: now.toDate(),
      end: final.toDate(),
    },
  },
  auth: {
    checking: false,
    uid: "123",
    name: "Edgar",
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CalendarModal />
    </MuiPickersUtilsProvider>
  </Provider>
);

describe("Pruebas en CalendarModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe mostrar Modal", () => {
    // expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("Llamar actualizar y cerrar", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("Error en título", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });

  test("Debe crear evento", () => {
    const initState = {
      ui: {
        modalOpen: true,
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        checking: false,
        uid: "123",
        name: "Edgar",
      },
    };
    let store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CalendarModal />
        </MuiPickersUtilsProvider>
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola Test",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "Hola Test",
      notes: "",
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("Debe de validar las fechas", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola Test",
      },
    });

    const today = new Date();

    console.log(wrapper.find("ThemeProvider").at(1).children().prop());

    act(() => {
      wrapper.find("ThemeProvider").at(1).children().prop("onChange")(today);
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Start date has to be greater than End date",
      "error"
    );
  });
});
