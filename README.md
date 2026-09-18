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

After GitHub marks the PR `MERGED`, clean its branch with the hygiene script. The greeting CLI does not change.

1. From any worktree of this repo, run the script with the PR number or the branch name.

```
npm run hygiene -- 5
```

```
npm run hygiene -- feat/hello-help
```

2. Confirm that the script prints `PR #N is MERGED` and then removes matching worktrees, the local branch, and `origin/<branch>`.
3. Confirm that the script prints remaining branches and `git status`.
4. Run the same command again. A second run exits 0 and reports that the local and remote branches are already gone.

The script refuses `main`, an open PR, and a dirty worktree.
