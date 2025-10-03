# YALOG - Yet Another Logger

Another logger from someone you've never heard of. But this one has some features you might like. No external dependencies, just pure TypeScript with custom formatting support.

Oh, and it's written in TypeScript.

## Features

- [x] Custom formatting with formatters API
- [x] Proper object and array logging (with JSON serialization)
- [x] Template literal support (original feature 😮)
- [x] Configurable log levels
- [x] Timestamp support
- [x] Pretty-print option for objects
- [x] Custom output handlers
- [x] TypeScript support with full type definitions
- [x] Both CommonJS and ESM support
- [x] No external dependencies

## Installation

```bash
npm install yalog
```

## Usage

### Basic Usage

```ts
import { log, info, warn, error, debug } from 'yalog'

const name = "John"

// Template literals (original feature!)
log`Template functions? WHAT 🤯🤯`
info`I am a log message`
warn`Careful, ${name}!`
error`Something went wrong!`
debug`Debugging is important`

// Objects and arrays
info('User data:', { name: 'Alice', age: 30 })
warn('Numbers:', [1, 2, 3, 4, 5])
error('Error details:', { code: 500, message: 'Server error' })
```

### Custom Logger Instance

```ts
import { Logger } from 'yalog'

// Create a logger with custom options
const logger = new Logger({
  level: 'debug',
  formatOptions: {
    colors: true,
    timestamp: true,
    pretty: false
  }
})

logger.info('Custom logger message')
logger.debug('Debug information')
```

### Pretty Printing

```ts
import { Logger } from 'yalog'

const logger = new Logger({
  formatOptions: {
    pretty: true  // Enable pretty printing for objects
  }
})

logger.info('User:', {
  name: 'Alice',
  roles: ['admin', 'user'],
  settings: { theme: 'dark' }
})
```

### Custom Formatter

```ts
import { Logger } from 'yalog'

const logger = new Logger({
  formatter: (level, args, options) => {
    return `[${level.toUpperCase()}] ${args.join(' ')}`
  }
})

logger.info('Custom formatted message')
```

### Custom Output Handler

```ts
import { Logger } from 'yalog'
import fs from 'fs'

// Log to file instead of console
const logger = new Logger({
  output: (message) => {
    fs.appendFileSync('app.log', message + '\n')
  }
})

logger.info('This goes to a file!')
```

### Log Levels

Available log levels (in order):
- `off` - No logging
- `log` - Basic logging
- `error` - Errors only
- `warn` - Warnings and above
- `info` - Info and above (default)
- `debug` - Debug and above
- `trace` - Trace and above
- `all` - Everything

```ts
import { Logger } from 'yalog'

const logger = new Logger({ level: 'warn' })

logger.debug('Not shown')  // Won't appear
logger.info('Not shown')   // Won't appear
logger.warn('Shown!')      // Will appear
logger.error('Shown!')     // Will appear
```

## API

### Logger Constructor Options

```ts
interface LoggerOptions {
  level?: 'off' | 'log' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'all' | number
  formatter?: Formatter
  formatOptions?: FormatOptions
  output?: (message: string) => void
}
```

### Format Options

```ts
interface FormatOptions {
  colors?: boolean      // Enable ANSI colors (default: true)
  timestamp?: boolean   // Add timestamp to logs (default: false)
  pretty?: boolean      // Pretty-print objects (default: false)
}
```

### Logger Methods

- `log(...args)` - Log a message
- `error(...args)` - Log an error
- `warn(...args)` - Log a warning
- `info(...args)` - Log info
- `debug(...args)` - Log debug info
- `trace(...args)` - Log trace info
- `setLevel(level)` - Change log level
- `setFormatter(formatter)` - Change formatter
- `setFormatOptions(options)` - Update format options
- `setOutput(output)` - Change output handler

## License

MIT

