# standalone-app-test

Trying to identify what is causing the Deno subprocess to give up on the universe whenever we call a "slashcommand".

# Running it

First of all the usual installation

```sh
$ npm install
```

The `@rocket.chat/apps-engine` package will install a deno executable at `node_modules/deno-bin/bin/deno`

Then simply run `index.js`

```sh
$ node index.js
```

You can observe the process be spawned and crash by using your system monitor.

The script runs deno with the `--inspect` flag, so DevTools (`chrome://inspect`) should find it.

There are no default breakpoints, so you'll have to add your own.
