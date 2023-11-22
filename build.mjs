import mdx from '@mdx-js/esbuild'
import esbuild from 'esbuild'
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import { createRouterFile } from './create-router-imports.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directory = join(__dirname, './')

const entryPoints = readdirSync(path.resolve(), { recursive: true })
  .filter(file => file.endsWith('.mdx'))
  .map(file => join(__dirname, file))

await esbuild.build({
  entryPoints: entryPoints,
  format: 'esm',
  // outdir: join(__dirname, './react-app/src/mdx-dist'),
  outdir: join(__dirname, './mdx-dist'),
  plugins: [mdx({/* jsxImportSource: …, otherOptions… */ })]
})

// createRouterFile()
