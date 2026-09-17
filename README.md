# hello-print

This project prints `hello`.

## How to print hello

You need Node.js 18 or later.

```
npm start
```

You will see a single line `hello`.

To greet someone, pass `--name` and a value.

```
node cli.js --name Ada
```

You will see a single line `hello, Ada`.

To print the greeting in uppercase, pass `--loud`.

```
node cli.js --loud
```

You will see a single line `HELLO`.

```
node cli.js --name Ada --loud
```

You will see a single line `HELLO, ADA`.

To print usage and exit 0, pass `--help`.

```
node cli.js --help
```

You will see a single line `Usage: node cli.js [--name <name>] [--loud] [--help]`.

## How to run the tests

```
npm test
```

A passing run prints the `cli.js` stdout line `hello` from the spawn test and ends with tests passing.
