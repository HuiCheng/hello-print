import { parseArgs } from 'node:util';

export function parseOptions(args) {
  const { values } = parseArgs({
    args,
    options: {
      name: { type: 'string' },
      loud: { type: 'boolean', default: false },
    },
    strict: true,
  });
  return { name: values.name, loud: values.loud };
}
