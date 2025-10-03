import { Logger, LoggerOptions, LogLevel } from './logger'
import { Formatter, FormatOptions, defaultFormatter } from './formatter'

// Create a default logger instance
const logger = new Logger({ level: 'all' })

// Export bound methods for convenience (like the original API)
const methods = {
  log: logger.log.bind(logger),
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
  trace: logger.trace.bind(logger),
}

// Named exports
export { Logger, LoggerOptions, LogLevel, Formatter, FormatOptions, defaultFormatter }
export const { log, error, warn, info, debug, trace } = methods

// Default export (like the original)
export default methods
