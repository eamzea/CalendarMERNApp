import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch";
import { types } from "../../types/types";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("Pruebas en Actions Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("Pruebas en el StartLogin", async () => {
    await store.dispatch(startLogin("email@email.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("Pruebas startLogin incorrecto", async () => {
    await store.dispatch(startLogin("email@email.com", "1"));

    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();

    await store.dispatch(startLogin("email@email", "123456"));

    actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();
  });

  test("Pruebas en el startRegister", async () => {
    fetchModule.fetchNoToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123456789",
          name: "arturo",
          token: "ABC123456789",
        };
      },
    }));

    await store.dispatch(startRegister("test@test.com", "123456", "Testing"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123456789",
        name: "arturo",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123456789");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("Pruebas en StartCheking", async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123456789",
          name: "arturo",
          token: "ABC123456789",
        };
      },
    }));

    await store.dispatch(startChecking());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123456789",
        name: "arturo",
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123456789");
  });
});
