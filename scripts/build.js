#!/usr/bin/env node
/**
 * Build Script for First Contact
 *
 * Creates production bundle with cache-busting hashes:
 * - Bundles and minifies JS
 * - Copies CSS with hash
 * - Generates index.html with correct references
 * - All output goes to dist/
 */

import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from 'fs';
import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

// Read version from VERSION file
const VERSION = readFileSync(join(ROOT, 'VERSION'), 'utf8').trim();
console.log(`Version: v${VERSION}\n`);

// Clean dist directory
if (existsSync(DIST)) {
    rmSync(DIST, { recursive: true });
}
mkdirSync(DIST);
mkdirSync(join(DIST, 'css'));

console.log('Building First Contact...\n');

// 1. Bundle JavaScript with esbuild
console.log('[1/4] Bundling JavaScript...');
const jsResult = await esbuild.build({
    entryPoints: [join(ROOT, 'js/app.js')],
    bundle: true,
    minify: true,
    format: 'iife',
    outdir: DIST,
    entryNames: '[name].[hash]',
    metafile: true,
});

// Get the output filename
const jsOutputFile = Object.keys(jsResult.metafile.outputs)
    .find(f => f.endsWith('.js'));
const jsFilename = jsOutputFile.split('/').pop();
console.log(`   Generated: ${jsFilename}`);

// 2. Copy and hash CSS
console.log('[2/4] Processing CSS...');
const cssContent = readFileSync(join(ROOT, 'css/styles.css'), 'utf8');
const cssHash = createHash('md5').update(cssContent).digest('hex').slice(0, 8);
const cssFilename = `styles.${cssHash}.css`;
writeFileSync(join(DIST, 'css', cssFilename), cssContent);
console.log(`   Generated: css/${cssFilename}`);

// 3. Generate index.html
console.log('[3/4] Generating index.html...');
const htmlTemplate = readFileSync(join(ROOT, 'index.html'), 'utf8');
const htmlOutput = htmlTemplate
    // Replace ES module script with bundled script
    .replace(
        /<script type="module" src="js\/app\.js"><\/script>/,
        `<script src="${jsFilename}"></script>`
    )
    // Replace CSS reference with hashed version
    .replace(
        /href="css\/styles\.css"/,
        `href="css/${cssFilename}"`
    )
    // Inject version from VERSION file
    .replace(
        /\{\{VERSION\}\}/g,
        `v${VERSION}`
    );
writeFileSync(join(DIST, 'index.html'), htmlOutput);
console.log('   Generated: index.html');

// 4. Copy static assets
console.log('[4/4] Copying static assets...');
copyFileSync(join(ROOT, 'favicon.svg'), join(DIST, 'favicon.svg'));
copyFileSync(join(ROOT, 'world.json'), join(DIST, 'world.json'));
copyFileSync(join(ROOT, 'config.json'), join(DIST, 'config.json'));
console.log('   Copied: favicon.svg, world.json, config.json');

// Summary
const jsSize = (jsResult.metafile.outputs[jsOutputFile].bytes / 1024).toFixed(1);
console.log(`
Build complete!
───────────────────────────────
Output: dist/
  - ${jsFilename} (${jsSize} KB)
  - css/${cssFilename}
  - index.html
  - favicon.svg
  - world.json
  - config.json
───────────────────────────────
`);
