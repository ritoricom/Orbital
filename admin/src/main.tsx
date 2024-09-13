import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "@/App";
import { assertNotNullable } from "@/utils/assert";

const container = document.getElementById("root");
assertNotNullable(container);

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
