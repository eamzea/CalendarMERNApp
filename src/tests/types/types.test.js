import { types } from "../../types/types";
import "@testing-library/jest-dom";

describe("Pruebas en Types", () => {
  test("Deben de ser iguales", () => {
    expect(types).toEqual({
      uiOpenModal: "[UI] Open Modal",
      uiCloseModal: "[UI] Close Modal",

      eventSetActive: "[Event] Set Active",
      eventStartAddNew: "[Event] Start Add New",
      eventAddNew: "[Event] Add New",
      eventClearActiveEvent: "[Event] Clear Active Event",
      eventUpdated: "[Event] Updated Event",
      eventDeleted: "[Event] Deleted Event",
      eventLoaded: "[Event] Events Loaded",
      eventLogout: "[Event] Clean Events",

      authCheckingFinish: "[Auth] Finish Checking Login State",
      authStartLogin: "[Auth] Start Login",
      authLogin: "[Auth] Login",
      authStartRegister: "[Auth] Start Register",
      authStartTokenRenew: "[Auth] Start Token Renew",
      authLogout: "[Auth] Logout",
    });
  });
});
