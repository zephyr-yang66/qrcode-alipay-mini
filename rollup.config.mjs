import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import {terser} from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
export default [{
    input: 'lib/index.js',
    output: { file: 'build/qrcode.js', format: 'iife', name: 'QRCode', exports: 'named' },
    plugins: [commonjs(), resolve(), babel(), terser()]
}]
