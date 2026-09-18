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

You will see a single line `Usage: node cli.js [--help] [--name <name>] [--loud]`.

## How to run the tests

```
npm test
```

A passing run prints the `cli.js` stdout line `hello` from the spawn test and ends with tests passing.

## How to clean a merged stack branch

The greeting CLI does not change. After a PR is `MERGED`, run the hygiene script with the PR number or the branch name.

```
npm run hygiene -- 5
```

```
npm run hygiene -- feat/hello-help
```

The script confirms `MERGED` with `gh`, removes matching worktrees listed by `git worktree list`, deletes the local and remote branch, runs `git fetch --prune`, and prints remaining branches plus `git status`. A second run on the same merged PR exits 0. It refuses `main`, an open PR, and a dirty worktree.
