import { defaultFormatter, Formatter, FormatOptions } from './formatter'

// deno-lint-ignore no-explicit-any
const isTagFunction = (args: any) => {
  if (Array.isArray(args[0])) return true
  else return false
}

const interpolate = (strings: TemplateStringsArray, values: unknown[]): string => {
  return strings.map((string, index) => {
    return string + (values[index] ?? '')
  }).join('')
}

const convert = (args: unknown[]): unknown[] => {
  if (isTagFunction(args)) {
    const strings = args[0] as TemplateStringsArray
    const values = args.slice(1) as unknown[]
    return [interpolate(strings, values)]
  } else {
    return args
  }
}

export type LogLevel = 'off' | 'log' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'all'

export interface LoggerOptions {
  level?: LogLevel | number
  formatter?: Formatter
  formatOptions?: FormatOptions
  output?: (message: string) => void
}

export class Logger {
  private _level = 4
  private _formatter: Formatter
  private _formatOptions: FormatOptions
  private _output: (message: string) => void

  constructor(options: LoggerOptions = {}) {
    const { level = 'info', formatter = defaultFormatter, formatOptions = {}, output = console.log } = options
    
    this._level = 4 // default to info
    if (typeof level === 'number') {
      this._level = level
    } else {
      const levels: LogLevel[] = ['off', 'log', 'error', 'warn', 'info', 'debug', 'trace', 'all']
      const index = levels.indexOf(level)
      if (index !== -1) {
        this._level = index
      }
    }
    
    this._formatter = formatter
    this._formatOptions = {
      colors: true,
      timestamp: false,
      pretty: false,
      ...formatOptions,
    }
    this._output = output
  }

  private _log(level: string, levelNum: number, ...args: unknown[]): void {
    if (this._level < levelNum) return
    
    const converted = convert(args)
    const formatted = this._formatter(level, converted, this._formatOptions)
    this._output(formatted)
  }

  public log(...args: unknown[]): void {
    this._log('log', 1, ...args)
  }

  public error(...args: unknown[]): void {
    this._log('error', 2, ...args)
  }

  public warn(...args: unknown[]): void {
    this._log('warn', 3, ...args)
  }

  public info(...args: unknown[]): void {
    this._log('info', 4, ...args)
  }

  public debug(...args: unknown[]): void {
    this._log('debug', 5, ...args)
  }

  public trace(...args: unknown[]): void {
    this._log('trace', 6, ...args)
  }

  public setLevel(level: LogLevel | number): void {
    if (typeof level === 'number') {
      this._level = level
    } else {
      const levels: LogLevel[] = ['off', 'log', 'error', 'warn', 'info', 'debug', 'trace', 'all']
      const index = levels.indexOf(level)
      if (index !== -1) {
        this._level = index
      }
    }
  }

  public setFormatter(formatter: Formatter): void {
    this._formatter = formatter
  }

  public setFormatOptions(options: FormatOptions): void {
    this._formatOptions = { ...this._formatOptions, ...options }
  }

  public setOutput(output: (message: string) => void): void {
    this._output = output
  }
}
