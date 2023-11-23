import { join, parse, resolve } from 'path';
import * as fs from 'fs'

export const createRouterFile = () => {
  const folderPath = join(resolve(), 'dist', 'src', 'mdx-dist')

  const outputFile = join(resolve(), 'dist', 'src', 'router.js')

  const fileNames = []
  fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const fileNameWithoutExtension = parse(file).name;
      const camelCaseName = convertToCamelCase(fileNameWithoutExtension);
      fileNames.push({ componentName: camelCaseName, fileName: fileNameWithoutExtension })
    })

  const newJSFileContent = getNewJSFileContent(fileNames);

  fs.writeFileSync(outputFile, newJSFileContent, err => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }

    console.log(`Content written to ${outputFile}`);
  });

  function getNewJSFileContent(fileNames) {
    const importStatements = fileNames.map(file => {
      return `import ${file.componentName} from './mdx-dist/${file.fileName}';`;
    });

    const routerConfig = fileNames.map(file => {
      return `  {
      path: "/${file.fileName}",
      element: <${file.componentName}/>,
    },`;
    });

    const outputContent = `
    import React from 'react';
  ${importStatements.join('\n')}
  
  import { createBrowserRouter } from 'react-router-dom';
  
  export const router = createBrowserRouter([
  ${routerConfig.join('\n')}
  ]);
    `;

    return outputContent;
  }

  function convertToCamelCase(str) {
    return str.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("");
  }
}

