#!/usr/bin/env node

import { program } from 'commander';
import { readdirSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import esbuild from 'esbuild';
import mdx from '@mdx-js/esbuild'
import { join, resolve } from 'path';
import { createRouterFile } from './create-router-imports.mjs'
import { indexJs, gitignore } from './boilerplate-files.mjs'
import { tmpdir } from 'os'

program
  .command('start')
  .description('Start docs in current directory')
  .action(async () => {
    console.log('Loading...')

    const tempDir = join(tmpdir(), 'demo-doc-dist');

    if (!existsSync(tempDir)) {
      mkdirSync(tempDir);
    }

    execSync(`rm -rf dist && mkdir dist && cd dist && npm init -y`,
      { stdio: 'inherit', cwd: tempDir },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
      });

    writeFileSync(join(tempDir, 'dist', '.gitignore'), gitignore, err => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
    });

    execSync(`cd dist && npm i react react-router-dom react-dom kedar-scripts`,
      { stdio: 'inherit', cwd: tempDir },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
      });

    execSync(`cd dist && mkdir src`,
      { stdio: 'inherit', cwd: tempDir },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
      });

    writeFileSync(join(tempDir, 'dist', 'src', 'index.js'), indexJs, err => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
    });

    const entryPoints = readdirSync(resolve(), { recursive: true })
      .filter(file => file.endsWith('.mdx'))
      .map(file => join(resolve(), file));

    await esbuild.build({
      entryPoints,
      format: 'esm',
      outdir: join(tempDir, 'dist', 'src', 'mdx-dist'),
      plugins: [mdx()]
    });

    createRouterFile(false)

    execSync(`cd dist/node_modules/kedar-scripts && npx webpack-dev-server --mode development --open`,
      { stdio: 'inherit', cwd: tempDir },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
        console.log('run webpack-dev-server')
      });
  });


program
  .command('build')
  .description('Build docs in current directory')
  .action(async () => {
    console.log('Loading...')
    execSync(`rm -rf dist && mkdir dist && cd dist && npm init -y`,
      { stdio: 'inherit' },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
        console.log('Created package.json')
      });

    writeFileSync(join(resolve(), 'dist', '.gitignore'), gitignore, err => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      console.log(`Content written to ${outputFile}`);
    });

    execSync(`cd dist && npm i react react-router-dom react-dom kedar-scripts`,
      { stdio: 'inherit' },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
        console.log('Install react, react-router-dom, react-dom')
      });

    execSync(`cd dist && npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin webpack webpack-cli webpack-dev-server`,
      { stdio: 'inherit' },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
        console.log('Install dev dependencies')
      });

    execSync(`cd dist && mkdir src`,
      { stdio: 'inherit' },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
        console.log('Install dev dependencies')
      });

    writeFileSync(join(resolve(), 'dist', 'src', 'index.js'), indexJs, err => {
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

    createRouterFile(true)

    execSync(`cd dist/node_modules/kedar-scripts && npx webpack --mode production`,
      { stdio: 'inherit' },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing npm script: ${error}`);
          return;
        }
        console.log('run webpack-dev-server')
      });

      rmSync(join(resolve(), 'dist'))
  });


program.parse(process.argv);
