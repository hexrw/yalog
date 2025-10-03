const { Logger, log, error, warn, info, debug } = require('./dist/index.js');

console.log('=== YALOG Examples ===\n');

// Example 1: Basic usage with template literals
console.log('Example 1: Template Literals');
const username = "Alice";
log`Welcome ${username}!`;
info`Processing data for ${username}`;
warn`Low disk space detected`;
error`Failed to connect to database`;
console.log();

// Example 2: Logging objects and arrays
console.log('Example 2: Objects and Arrays');
info('User profile:', { 
  name: 'Bob', 
  email: 'bob@example.com',
  roles: ['admin', 'user'] 
});

warn('Failed items:', [
  { id: 1, reason: 'timeout' },
  { id: 2, reason: 'invalid data' }
]);
console.log();

// Example 3: Custom logger with timestamps
console.log('Example 3: Logger with Timestamps');
const timestampLogger = new Logger({
  level: 'debug',
  formatOptions: {
    timestamp: true,
    colors: true
  }
});

timestampLogger.info('Server started');
timestampLogger.debug('Loading configuration');
timestampLogger.warn('Using default settings');
console.log();

// Example 4: Pretty printing
console.log('Example 4: Pretty Printing');
const prettyLogger = new Logger({
  formatOptions: {
    pretty: true
  }
});

prettyLogger.info('API Response:', {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  },
  meta: {
    total: 2,
    page: 1
  }
});
console.log();

// Example 5: Custom formatter
console.log('Example 5: Custom Formatter');
const customLogger = new Logger({
  formatter: (level, args) => {
    const timestamp = new Date().toLocaleTimeString();
    return `${timestamp} | ${level.toUpperCase().padEnd(5)} | ${args.join(' ')}`;
  }
});

customLogger.info('Custom format message');
customLogger.error('Custom error format');
console.log();

// Example 6: Log levels
console.log('Example 6: Log Levels');
const warnLogger = new Logger({ level: 'warn' });

console.log('Logger set to WARN level:');
warnLogger.debug('This will not show');
warnLogger.info('This will not show');
warnLogger.warn('This WILL show');
warnLogger.error('This WILL show');
console.log();

// Example 7: Capturing logs
console.log('Example 7: Capturing Logs');
const logs = [];
const captureLogger = new Logger({
  output: (msg) => logs.push(msg)
});

captureLogger.info('Captured message 1');
captureLogger.error('Captured message 2');
captureLogger.warn('Captured message 3');

console.log('Captured', logs.length, 'log messages');
console.log();

console.log('=== Examples Complete ===');
