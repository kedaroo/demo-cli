#!/usr/bin/env node

import { program } from 'commander';
import { readdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import esbuild from 'esbuild';
import mdx from '@mdx-js/esbuild'
import { join, resolve } from 'path';
import webpackConfig from './webpack.config.js'
import indexJs from './index.js'
import indexHtml from './indexHtml.js'
import { createRouterFile } from './create-router-imports.mjs'

program
  .command('start')
  .description('Start docs in current directory')
  .action(async () => {
    console.log('Loading...')
    execSync(`rm -rf dist && mkdir dist && cd dist && npm init -y`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing npm script: ${error}`);
        return;
      }

      console.log('Created package.json')

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
    });

    execSync(`cd dist && npm i react react-router-dom react-dom`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing npm script: ${error}`);
        return;
      }

      console.log('Install react, react-router-dom, react-dom')

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
    });

    execSync(`cd dist && npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin webpack webpack-cli webpack-dev-server`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing npm script: ${error}`);
        return;
      }

      console.log('Install dev dependencies')

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
    });

    execSync(`cd dist && mkdir src`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing npm script: ${error}`);
        return;
      }

      console.log('Install dev dependencies')

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
    });


    writeFileSync(join(resolve(), 'dist', 'webpack.config.js'), webpackConfig, err => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }

      console.log(`Content written to ${outputFile}`);
    });

    writeFileSync(join(resolve(), 'dist', 'src', 'index.js'), indexJs, err => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }

      console.log(`Content written to ${outputFile}`);
    });

    writeFileSync(join(resolve(), 'dist', 'src', 'index.html'), indexHtml, err => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }

      console.log(`Content written to ${outputFile}`);
    });

    const entryPoints = readdirSync(resolve(), { recursive: true })
      .filter(file => file.endsWith('.mdx'))
      .map(file => join(resolve(), file));

    await esbuild.build({
      entryPoints,
      format: 'esm',
      outdir: join(resolve(), 'dist', 'src', 'mdx-dist'),
      plugins: [mdx()]
    });

    createRouterFile()

    execSync(`cd dist && npx webpack-dev-server --mode development --open`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing npm script: ${error}`);
        return;
      }

      console.log('run webpack-dev-server')

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
    });
  });

program.parse(process.argv);
