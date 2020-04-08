/* tslint:disable:no-console */
import Progress from './'

describe('Progress', () => {
  describe('getProgress', () => {
    test('updates and return progress', () => {
      const progress = new Progress(10)
      expect(progress.getProgress()).toEqual(10)
      expect(progress.getProgress()).toEqual(20)
      expect(progress.getProgress(3)).toEqual(50)
    })
  })

  describe('log', () => {
    test('updates and logs progress using console.log', () => {
      const progress = new Progress(10)
      const backup = console.log
      const fn  = jest.fn()
      console.log = fn

      progress.log()
      expect(fn.mock.calls.length).toBe(1)
      expect(fn.mock.calls[0][0]).toBe('10%')

      progress.log()
      expect(fn.mock.calls.length).toBe(2)
      expect(fn.mock.calls[1][0]).toBe('20%')

      progress.log(3)
      expect(fn.mock.calls.length).toBe(3)
      expect(fn.mock.calls[2][0]).toBe('50%')

      console.log = backup
    })

    test('should not log when progress percentage does not change', () => {
      const progress = new Progress(300)
      const backup = console.log
      const fn  = jest.fn()
      console.log = fn

      progress.log()
      expect(fn.mock.calls.length).toBe(1)
      expect(fn.mock.calls[0][0]).toBe('0%')

      progress.log()
      expect(fn.mock.calls.length).toBe(1)

      progress.log()
      expect(fn.mock.calls.length).toBe(2)
      expect(fn.mock.calls[1][0]).toBe('1%')

      console.log = backup
    })
  })
})
