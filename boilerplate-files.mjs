export const indexJs = `import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<RouterProvider router={router} />);`

export const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App without CRA</title>
</head>
<body>    
  <div id="root"></div>
</body>
</html>`

export const gitignore = `node_modules`