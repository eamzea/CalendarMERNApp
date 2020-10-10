import "@testing-library/jest-dom";
import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducers";

const initState = {
  modalOpen: false,
};

describe("Pruebas en uiReducer", () => {
  test("Debe de retornar el estado por defecto", () => {
    const state = uiReducer(initState, {});

    expect(state).toEqual(initState);
  });

  test("Debe de abrir y cerrar el modal", () => {
    const modalOpen = uiOpenModal();

    let state = uiReducer(initState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const modalClose = uiCloseModal();

    const stateClose = uiReducer(state, modalClose);

    expect(stateClose).toEqual({ modalOpen: false });
  });
});
