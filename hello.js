export { parseOptions } from './parse.js';

export function hello(name) {
  if (name === undefined) {
    return 'hello';
  }
  return `hello, ${name}`;
}

export function render(text, loud) {
  if (loud) {
    return text.toUpperCase();
  }
  return text;
}
