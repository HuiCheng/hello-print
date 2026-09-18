import { parseArgs } from 'node:util';

export function parseOptions(args) {
  const { values } = parseArgs({
    args,
    options: {
      name: { type: 'string' },
      loud: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
    strict: true,
  });
  return { name: values.name, loud: values.loud, help: values.help };
}

export function usage() {
  return 'Usage: node cli.js [--help] [--name <name>] [--loud]';
}
