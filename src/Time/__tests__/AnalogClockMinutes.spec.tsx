import React from 'react'
import { render } from '@testing-library/react-native'
import AnalogClockMinutes, { getMinuteNumbers } from '../AnalogClockMinutes'
import { circleSize } from '../timeUtils'

describe('AmPmSwitcher', () => {
  it('should return minutes numbers coordinates', () => {
    // TODO need to be challenged here
    const numbers = getMinuteNumbers(circleSize, 12)
    expect(numbers).toEqual([
      [108, 22],
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
    ])
  })
  it('should render analog clock', () => {
    const { toJSON } = render(<AnalogClockMinutes {...{ minutes: 24 }} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
