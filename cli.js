#!/usr/bin/env node

const { program } = require('commander');

program
  .command('start')
  .description('Start docs in current directory')
  .action((projectName) => {
    console.log('Starting docs app')
    // console.log(`Creating React app: ${projectName}`);
    // Add logic to create the React app here
  });

program.parse(process.argv);
