import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import LoginScreen from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Pruebas en LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de llamar Login", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: "email@email.com",
      },
    });
    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith("email@email.com", "123456");
  });

  test("Contraseñas diferentes", () => {
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "1234567",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Passwords has to be equals",
      "error"
    );
  });

  test("Registro con contraseñas", () => {
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "123456",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });

    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith("", "123456", "");
  });
});
