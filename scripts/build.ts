import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./dist/main.js'],
  bundle: true,
  outfile: './dist-min/bundle.js',
  platform: 'node',
  sourcemap: true, // Optional: Generate source maps
  minify: true,    // Optional: Minify the output
  target: ['node16'], // Optional: Specify the target environment
})
  .then(() => {
    console.log('Build succeeded');
  })
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });