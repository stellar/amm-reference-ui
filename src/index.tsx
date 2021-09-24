import ReactDOM from "react-dom";
import { App } from "./App";
import { worker } from "./mocks/api";
// Import global CSS from Stellar Design System
import "@stellar/design-system/build/styles.min.css";

worker.start();

ReactDOM.render(<App />, document.getElementById("root"));
