#!/usr/bin/env node

const { program } = require('commander');
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')
const esbuild = require('esbuild')

program
  .command('start')
  .description('Start docs in current directory')
  .action(async (projectName) => {
    // console.log(path.resolve(), process.cwd(), path.basename(path.resolve()))
    const entryPoints = fs.readdirSync(path.resolve(), { recursive: true })
      .filter(file => file.endsWith('.mdx'))
      .map(file => path.join(path.resolve(), file))


    await esbuild.build({
      entryPoints: entryPoints,
      format: 'esm',
      // outdir: join(__dirname, './react-app/src/mdx-dist'),
      outdir: join(path.resolve(), './mdx-dist'),
      plugins: [mdx({/* jsxImportSource: …, otherOptions… */ })]
    })

    // exec(`npm run ${scriptName}`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error executing npm script: ${error}`);
    //     return;
    //   }

    //   // Output from the script
    //   console.log(`stdout: ${stdout}`);
    //   console.error(`stderr: ${stderr}`);
    // });

  });

program.parse(process.argv);
