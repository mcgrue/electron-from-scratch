const esbuild = require('esbuild');
const copyPlugin = require('esbuild-plugin-copy');
const copyStaticFiles = require('esbuild-copy-static-files');
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const rimraf = require('rimraf');

console.log(copyPlugin);

// TODO: make these settable from args
const sourcemap = true;
const watch = false;
const minify = false;

(async () => {
  // Remove the 'dist' directory before building
  rimraf.sync('dist');

  /// server translation
  const result = await esbuild
    .build({
      tsconfig: 'build-infrastructure/tsconfig.json',

      // logLevel: 'verbose',

      bundle: true,
      sourcemap,
      minify,
      watch,
      metafile: true,
      platform: 'node',
      entryPoints: ['src/main/index.ts'],
      outfile: 'dist/main/index.js',
      external: ['electron'],
      plugins: [
        copyPlugin.copy({
          resolveFrom: 'cwd',
          assets: {
            from: ['src/main/preload/*.js'],
            to: ['dist/app/'],
          },
          verbose: true,
          // Copy 'src/main/preload.js' to 'dist/static/preload.js'
          //'src/main/preload.js': 'dist/static/preload.js',
        }),
      ],
    })
    .catch(function () {
      return process.exit(1);
    });

  let text = await esbuild.analyzeMetafile(result.metafile);
  console.log(text);
})();

(async () => {
  /// client translation
  const result = await esbuild
    .build({
      tsconfig: 'build-infrastructure/tsconfig.json',

      // logLevel: 'verbose',

      bundle: true,
      sourcemap,
      minify,
      watch,
      metafile: true,
      platform: 'browser',
      entryPoints: ['src/app/index.tsx'],
      outfile: 'dist/app/index.js',
      plugins: [
        copyStaticFiles({
          src: 'src/app/index.html',
          dest: 'dist/app/index.html',
        }),
        cssModulesPlugin(),
      ],
      // plugins: [
      //   extensionResolverPlugin(['coffee', 'jadelet']),
      //   coffeeScriptPlugin({
      //     bare: true,
      //     inlineMap: sourcemap,
      //   }),
      // ],
    })
    .catch(function () {
      return process.exit(2);
    });

  let text = await esbuild.analyzeMetafile(result.metafile);
  console.log(text);
})();
