import React from 'react'
import { render } from '@testing-library/react-native'
import AnalogClockHours, { getHourNumbers } from '../AnalogClockHours'
import { circleSize } from '../timeUtils'
import { DisplayModeContext } from '../TimePicker'

describe('AmPmSwitcher', () => {
  it('should return hours numbers coordinates for AM/PM', () => {
    // TODO need to be challenged here
    const numbers = getHourNumbers(false, circleSize, 12, 12)
    expect(numbers).toEqual([
      [151, 33],
      [182, 65],
      [194, 107],
      [182, 150],
      [151, 182],
      [108, 194],
      [65, 182],
      [33, 151],
      [22, 108],
      [33, 65],
      [64, 33],
      [107, 22],
    ])
  })
  it('should return hours numbers coordinates for 24hours', () => {
    // TODO need to be challenged here
    const numbers = getHourNumbers(true, circleSize, 12, 12)
    expect(numbers).toEqual([
      [134, 61],
      [154, 81],
      [161, 107],
      [154, 134],
      [134, 154],
      [108, 161],
      [81, 154],
      [61, 134],
      [54, 108],
      [61, 81],
      [81, 61],
      [107, 54],
    ])
  })
  it('should render analog clock for 24Hours', () => {
    const { toJSON } = render(
      <DisplayModeContext.Provider
        value={{ mode: undefined, setMode: jest.fn() }}
      >
        <AnalogClockHours {...{ is24Hour: true, hours: 12 }} />
      </DisplayModeContext.Provider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
  it('should render analog clock for 24Hours at midnight', () => {
    const { toJSON } = render(
      <DisplayModeContext.Provider
        value={{ mode: undefined, setMode: jest.fn() }}
      >
        <AnalogClockHours {...{ is24Hour: true, hours: 0 }} />
      </DisplayModeContext.Provider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
  it('should render analog clock for 24Hours at 24', () => {
    const { toJSON } = render(
      <DisplayModeContext.Provider
        value={{ mode: undefined, setMode: jest.fn() }}
      >
        <AnalogClockHours {...{ is24Hour: true, hours: 24 }} />
      </DisplayModeContext.Provider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
  it('should render analog clock for AM', () => {
    const { toJSON } = render(
      <DisplayModeContext.Provider value={{ mode: 'AM', setMode: jest.fn() }}>
        <AnalogClockHours {...{ is24Hour: true, hours: 12 }} />
      </DisplayModeContext.Provider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
  it('should render analog clock for PM ', () => {
    const { toJSON } = render(
      <DisplayModeContext.Provider value={{ mode: 'PM', setMode: jest.fn() }}>
        <AnalogClockHours {...{ is24Hour: true, hours: 8 }} />
      </DisplayModeContext.Provider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
  it("should render analog clock for AM at 0 o'clock", () => {
    const { toJSON } = render(
      <DisplayModeContext.Provider value={{ mode: 'AM', setMode: jest.fn() }}>
        <AnalogClockHours {...{ is24Hour: true, hours: 0 }} />
      </DisplayModeContext.Provider>
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
