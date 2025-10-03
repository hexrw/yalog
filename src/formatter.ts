export interface FormatOptions {
  colors?: boolean
  timestamp?: boolean
  pretty?: boolean
}

export type Formatter = (level: string, args: unknown[], options: FormatOptions) => string

const defaultColors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  dim: '\x1b[2m',
}

const formatValue = (value: unknown, pretty: boolean): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  
  // Handle objects and arrays
  if (typeof value === 'object') {
    try {
      return pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value)
    } catch (e) {
      return String(value)
    }
  }
  
  return String(value)
}

export const defaultFormatter: Formatter = (level: string, args: unknown[], options: FormatOptions): string => {
  const { colors = true, timestamp = false, pretty = false } = options
  
  const parts: string[] = []
  
  // Add timestamp if requested
  if (timestamp) {
    const now = new Date().toISOString()
    parts.push(`[${now}]`)
  }
  
  // Add level
  let levelStr = `[${level.toUpperCase()}]`
  if (colors) {
    switch (level) {
      case 'error':
        levelStr = `${defaultColors.red}${levelStr}${defaultColors.reset}`
        break
      case 'warn':
        levelStr = `${defaultColors.yellow}${levelStr}${defaultColors.reset}`
        break
      case 'info':
        levelStr = `${defaultColors.cyan}${levelStr}${defaultColors.reset}`
        break
      case 'debug':
        levelStr = `${defaultColors.dim}${levelStr}${defaultColors.reset}`
        break
      case 'trace':
        levelStr = `${defaultColors.magenta}${defaultColors.dim}${levelStr}${defaultColors.reset}`
        break
    }
  }
  parts.push(levelStr)
  
  // Format the message
  const message = args.map(arg => formatValue(arg, pretty)).join(' ')
  if (colors && level === 'error') {
    parts.push(`${defaultColors.red}${message}${defaultColors.reset}`)
  } else if (colors && level === 'warn') {
    parts.push(`${defaultColors.yellow}${message}${defaultColors.reset}`)
  } else {
    parts.push(message)
  }
  
  return parts.join(' ')
}
