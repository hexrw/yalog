import { colors as clr } from "./deps.ts"


// deno-lint-ignore no-explicit-any
const isTagFunction = (args: any) => {
    // if (!Array.isArray(args)) return false
    // if (args.length < 2) return false
    // const strings = args[0]
    // const values = args.slice(1)
    // return Array.isArray(strings) && Array.isArray(values)
    //     && strings.length === values.length + 1
    if (Array.isArray(args[0])) return true
    else return false
}

const interpolate = (strings: TemplateStringsArray, values: unknown[]): string => {
    return strings.map((string, index) => {
        return string + (values[index] ?? "")
    }).join("")
}

const convert = (args: unknown[]): unknown[] | string => {
    if (isTagFunction(args)) {
        const strings = args[0] as TemplateStringsArray
        const values = args.slice(1) as unknown[]
        return interpolate(strings, values)
    } else return args
}

export class Logger {
    private _level = 4

    constructor(
        level: number | "off" | "log" | "error" | "warn" | "info" | "debug" | "trace" | "all" = "info"
    ) {
        this._level = 4  // default to info
        if (typeof level === "number") this._level = level
        else {
            const levels = ["off", "log", "error", "warn", "info", "debug", "trace", "all"]
            const index = levels.indexOf(level)

            if (index === -1) this._level = 4
            else this._level = index
        }
    }

    public log(...args: unknown[]): void {
        if (this._level < 1) return

        const converted = convert(args)
        if (Array.isArray(converted)) console.log(...converted)
        else console.log(converted)
    }
    public error(...args: unknown[]): void {
        if (this._level < 2) return

        const converted = convert(args)
        if (Array.isArray(converted)) console.error(...converted)
        else console.error(clr.red(converted))
    }
    public warn(...args: unknown[]): void {
        if (this._level < 3) return

        const converted = convert(args)
        if (Array.isArray(converted)) console.warn(...converted)
        else console.warn(clr.yellow(converted))
    }
    public info(...args: unknown[]): void {
        if (this._level < 4) return

        const converted = convert(args)
        if (Array.isArray(converted)) console.info(...converted)
        else console.info(clr.cyan(converted))
    }
    public debug(...args: unknown[]): void {
        if (this._level < 5) return

        const converted = convert(args)
        if (Array.isArray(converted)) console.debug(...converted)
        else console.debug(clr.dim(converted))
    }
    public trace(...args: unknown[]): void {
        if (this._level < 6) return

        const converted = convert(args)
        if (Array.isArray(converted)) console.trace(...converted)
        else console.trace(clr.magenta(clr.dim(converted)))
    }
    public clear() {
        console.clear()
    }
}

const logger = new Logger("all")
const methods = {
    log: logger.log.bind(logger),
    error: logger.error.bind(logger),
    warn: logger.warn.bind(logger),
    info: logger.info.bind(logger),
    debug: logger.debug.bind(logger),
    trace: logger.trace.bind(logger),
}

export default methods

const { log, error, warn, info, debug, trace } = methods
export { log, error, warn, info, debug, trace }
