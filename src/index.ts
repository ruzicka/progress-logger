import * as prettyMilliseconds from 'pretty-ms'

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
  private lastCounter: number
  private options: Options
  private executionTimesBuffer: number[]

  constructor(arrayOrLength: any[]|number, options: OptionsOptional = {}) {
    this.totalLength = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength
    this.counter = 0
    this.lastReportedProgress = -1
    this.lastTime = 0
    this.lastCounter = 0
    this.executionTimesBuffer = []
    this.options = {
      ...defaultOptions,
      ...options,
    }
  }

  private getAvgExecutionTime() {
    if (this.executionTimesBuffer.length === 0) {
      return -1
    }
    return this.executionTimesBuffer.reduce((acc, current) => {
      return acc + current
    }, 0) / this.executionTimesBuffer.length
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
    if (this.lastTime) {
      this.executionTimesBuffer.push(now - this.lastTime)
      if (this.executionTimesBuffer.length > 10) {
        this.executionTimesBuffer.shift()
      }
    }
    const itemsDiff = this.counter - this.lastCounter
    const avgExecutionTime = this.getAvgExecutionTime()
    const eta = avgExecutionTime < 0 ? -1 : (this.getAvgExecutionTime() / itemsDiff) * (this.totalLength - this.counter)
    if (this.lastReportedProgress < progress
        || (this.options.interval > 0 && (now - this.lastTime) > this.options.interval )) {
      console.log(`${progress}% - ${this.counter}/${this.totalLength}, ETA: ${eta < 0 ? '-' : prettyMilliseconds(eta)}`) // tslint:disable-line:no-console
      this.lastReportedProgress = progress
      this.lastTime = now
      this.lastCounter = this.counter
    }
  }
}

