import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import AmPmSwitcher from '../AmPmSwitcher'
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper'
import { DisplayModeContext } from '../TimePicker'
import { Text } from 'react-native'

const Wrapper: React.FC<{
  defaultHours: number
  dark: boolean
  children: (params: {
    hours: number
    onChange: React.Dispatch<React.SetStateAction<number>>
  }) => React.ReactElement
}> = ({ children, defaultHours, dark }) => {
  const [mode, setMode] = React.useState<'AM' | 'PM' | undefined>('AM')
  const [hours, setHours] = React.useState<number>(defaultHours)
  return (
    <PaperProvider theme={dark ? DarkTheme : DefaultTheme}>
      <DisplayModeContext.Provider value={{ mode, setMode }}>
        {children({ onChange: setHours, hours })}
      </DisplayModeContext.Provider>
    </PaperProvider>
  )
}

describe('AmPmSwitcher', () => {
  it('should update hours when selected for 12 and 24 hours', () => {
    const { getByText, toJSON } = render(
      <Wrapper {...{ defaultHours: 12, dark: false }}>
        {({ hours, onChange }) => (
          <>
            <Text testID="hours">{hours}</Text>
            <AmPmSwitcher {...{ hours, onChange }} />
          </>
        )}
      </Wrapper>
    )
    fireEvent.press(getByText('PM'))
    // It should add 12 hours

    expect(getByText('24')).not.toBeNull()

    expect(toJSON()).toMatchSnapshot()

    fireEvent.press(getByText('AM'))

    // It should remove 12 hours
    expect(getByText('12')).not.toBeNull()

    expect(toJSON()).toMatchSnapshot()
  })
  it('should not update hours when selected', () => {
    const { getByText, toJSON } = render(
      <Wrapper {...{ defaultHours: 5, dark: true }}>
        {({ hours, onChange }) => (
          <>
            <Text testID="hours">{hours}</Text>
            <AmPmSwitcher {...{ hours, onChange }} />
          </>
        )}
      </Wrapper>
    )
    fireEvent.press(getByText('PM'))
    // It should add 12 hours
    expect(getByText('17')).not.toBeNull()
    expect(toJSON()).toMatchSnapshot()

    fireEvent.press(getByText('AM'))

    // It should remove 12 hours
    expect(getByText('5')).not.toBeNull()
    expect(toJSON()).toMatchSnapshot()
  })
})
