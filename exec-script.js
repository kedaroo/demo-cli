const exec = require('node:child_process').exec

// Replace 'your-script-name' with the name of the npm script you want to run
const scriptName = 'demo';

// Use exec to run the npm script
exec(`npm run ${scriptName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing npm script: ${error}`);
    return;
  }

  // Output from the script
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});