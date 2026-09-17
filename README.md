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

## How to run the tests

```
npm test
```

A passing run prints the `cli.js` stdout line `hello` from the spawn test and ends with tests passing.
