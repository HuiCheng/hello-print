import { hello, parseName } from './hello.js';

console.log(hello(parseName(process.argv.slice(2))));
