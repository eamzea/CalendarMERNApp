import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import AppRouter from "../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Pruebas en AppRouter", () => {
  test("Debe de mostrar el Loading", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar Public Route", () => {
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("Debe mostrar Private Route", () => {
    const initState = {
      ui: {
        modalOpen: false,
      },
      calendar: {
        events: [],
      },
      auth: {
        checking: false,
        uid: "123",
        name: "Edgar",
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
