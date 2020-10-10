import "@testing-library/jest-dom";
import { fetchNoToken, fetchWithToken } from "../../helpers/fetch";

describe("Pruebas en helper Fetch", () => {
  let token = "";

  test("Fetch sin token", async () => {
    const resp = await fetchNoToken(
      "auth/login",
      { email: "email@email.com", password: "123456" },
      "POST"
    );

    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    token = body.token;

    expect(body.ok).toBe(true);
  });

  test("Fetch con Token", async () => {
    localStorage.setItem("token", token);

    const resp = await fetchWithToken(
      "events/delete/5f666370c116063de4694581",
      {},
      "DELETE"
    );
    const body = await resp.json();

    expect(body.msg).toEqual("The event does not exists");
  });
});
