# YALOG - Yet Another Logger

Another logger from someone you've never heard of. But this one has some features you might like. The only dependency is [colors](https://deno.land/std/fmt/colors.ts) from the Deno standard library.

Oh, and it's written in TypeScript.

## Features

- [x] Log to console
- [ ] Log to file
- [ ] Log to database
- [ ] Log to remote server
- [ ] Log to remote server with encryption
- [x] Use template functions (😮)

*More revolutionary features coming soon.*

## Usage

> Note: Only Deno is supported at the moment. Node support coming soon. Maybe.

```ts
import yalog from "https://deno.land/x/yalog/mod.ts"
const { log, info, warn, error, debug } = yalog

const name = "John"

log`Template functions? WHAT 🤯🤯`
info`I am a log message`
warn`Careful, ${name}!`
error`Something went wrong!`
debug`Debugging is important`
```

*More documentation coming soon. Not tested properly (at all).*
