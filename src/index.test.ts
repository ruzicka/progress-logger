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
      expect(fn.mock.calls[0][0]).toBe('10% - 1/10, ETA: -')

      progress.log()
      expect(fn.mock.calls.length).toBe(2)
      expect(fn.mock.calls[1][0].startsWith('20% - 2/10, ETA: ')).toEqual(true)

      progress.log(3)
      expect(fn.mock.calls.length).toBe(3)
      expect(fn.mock.calls[2][0].startsWith('50% - 5/10, ETA: ')).toEqual(true)

      console.log = backup
    })

    test('should not log when progress percentage does not change', () => {
      const progress = new Progress(300)
      const backup = console.log
      const fn  = jest.fn()
      console.log = fn

      progress.log()
      expect(fn.mock.calls.length).toBe(1)
      expect(fn.mock.calls[0][0]).toBe('0% - 1/300, ETA: -')

      progress.log()
      expect(fn.mock.calls.length).toBe(1)

      progress.log()
      expect(fn.mock.calls.length).toBe(2)
      expect(fn.mock.calls[1][0].startsWith('1% - 3/300, ETA:')).toEqual(true)

      console.log = backup
    })
  })
})
