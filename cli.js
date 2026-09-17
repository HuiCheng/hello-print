import { hello, parseOptions, render } from './hello.js';

const { name, loud } = parseOptions(process.argv.slice(2));
console.log(render(hello(name), loud));
