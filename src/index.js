import React from "react";
import ReactDOM from "react-dom";
import CalendarApp from "./CalendarApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import "fontsource-roboto";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<CalendarApp />, document.getElementById("root"));

serviceWorker.register();
