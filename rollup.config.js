import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import commonjs from  '@rollup/plugin-commonjs';

export default {
  input: './build/client/index.js',
  output: {
    file: './build/client/bundle.js',
    format: 'es',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    commonjs(),
    json(),
    replace({
      "preventAssignment" : true,
      'Reflect.decorate': 'undefined'
    }),
    resolve({browser: true,preferBuiltins: true}),
    filesize({
      showBrotliSize: true,
    }),
  ],
};
