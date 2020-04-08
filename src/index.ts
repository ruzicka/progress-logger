
interface OptionsOptional {
  interval?: number
}

interface Options {
  interval: number
}

const defaultOptions = {
  interval: 10000,
}

export default class Progress {
  private totalLength: number
  private counter: number
  private lastReportedProgress: number
  private lastTime: number
  private options: Options

  constructor(arrayOrLength: any[]|number, options: OptionsOptional = {}) {
    this.totalLength = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength
    this.counter = 0
    this.lastReportedProgress = -1
    this.lastTime = 0
    this.options = {
      ...defaultOptions,
      ...options,
    }
  }

  public getProgress(num: number = 1) {
    this.counter += num
    const value = Math.min(Math.floor((this.counter * 100) / this.totalLength), 100)
    if (value === 100 && this.counter < this.totalLength) {
      return 99
    }
    return value
  }

  public log(num: number = 1) {
    const progress = this.getProgress(num)
    const now = Date.now()
    if (this.lastReportedProgress < progress
        || (this.options.interval > 0 && (now - this.lastTime) > this.options.interval )) {
      console.log(`${progress}%`) // tslint:disable-line:no-console
      this.lastReportedProgress = progress
      this.lastTime = now
    }
  }
}

