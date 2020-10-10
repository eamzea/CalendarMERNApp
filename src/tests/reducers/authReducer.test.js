import "@testing-library/jest-dom";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
  checking: true,
  uid: null,
  name: null,
};

describe("Pruebas en AuthReducer", () => {
  test("Debe retornar el estado ", () => {
    const state = authReducer(initState, {});

    expect(state).toEqual(initState);
  });

  test("Pruebas en el login", () => {
    const action = {
      type: types.authLogin,
      payload: { uid: "123", name: "Edgar" },
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({ checking: false, uid: "123", name: "Edgar" });
  });
});
