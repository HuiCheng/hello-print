import { hello, parseOptions, render, usage } from './hello.js';

const { name, loud, help } = parseOptions(process.argv.slice(2));
if (help) {
  console.log(usage());
} else {
  console.log(render(hello(name), loud));
}
