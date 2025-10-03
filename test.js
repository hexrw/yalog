const { Logger, log, error, warn, info, debug, trace } = require('./dist/index.js');

console.log('=== Testing default logger ===\n');

// Test template literals (original feature)
const name = "John";
log`Template functions work! Hello ${name}`;
info`I am a log message`;
warn`Careful, ${name}!`;
error`Something went wrong!`;
debug`Debugging is important`;

console.log('\n=== Testing objects and arrays ===\n');

// Test objects
info('Object:', { name: 'Alice', age: 30, city: 'New York' });

// Test arrays
warn('Array:', [1, 2, 3, 4, 5]);

// Test nested structures
error('Nested:', { 
  user: { name: 'Bob', email: 'bob@example.com' },
  items: [1, 2, 3],
  active: true
});

// Test primitives
log('String:', 'Hello world');
log('Number:', 42);
log('Boolean:', true);
log('Null:', null);
log('Undefined:', undefined);

console.log('\n=== Testing custom logger with options ===\n');

// Create logger with custom options
const customLogger = new Logger({
  level: 'debug',
  formatOptions: {
    colors: true,
    timestamp: true,
    pretty: false
  }
});

customLogger.info('Custom logger with timestamp');
customLogger.debug('Debug message with custom logger');

console.log('\n=== Testing pretty printing ===\n');

const prettyLogger = new Logger({
  level: 'all',
  formatOptions: {
    colors: true,
    timestamp: false,
    pretty: true
  }
});

prettyLogger.info('Pretty object:', { 
  users: [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'user' }
  ],
  total: 2
});

console.log('\n=== Testing custom formatter ===\n');

const simpleLogger = new Logger({
  level: 'all',
  formatter: (level, args, options) => {
    return `[${level}] ${args.join(' ')}`;
  }
});

simpleLogger.info('Custom formatter message');
simpleLogger.warn('Custom warning');

console.log('\n=== Testing custom output ===\n');

const messages = [];
const captureLogger = new Logger({
  level: 'all',
  output: (msg) => {
    messages.push(msg);
  }
});

captureLogger.info('Captured message 1');
captureLogger.error('Captured message 2');

console.log('Captured messages:', messages);

console.log('\n=== Testing level control ===\n');

const levelLogger = new Logger({ level: 'warn' });
levelLogger.debug('This should not appear');
levelLogger.info('This should not appear either');
levelLogger.warn('This SHOULD appear');
levelLogger.error('This SHOULD appear too');

console.log('\n=== All tests completed! ===');
