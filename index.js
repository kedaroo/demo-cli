module.exports = `import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<RouterProvider router={router} />);`

// module.exports = `import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// // import { router } from "./router";

// ReactDOM
//   .createRoot(document.getElementById("root"))
//   .render(<div>hello world</div>);`