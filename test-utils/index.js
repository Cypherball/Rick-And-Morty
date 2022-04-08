/**
 * Custom Render for Testing Library
 * Adds App Providers to the render tree
 */

import React from 'react'
import { render } from '@testing-library/react-native'
import '@testing-library/jest-native/extend-expect'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import theme from '../app/appTheme.json'
import { NavigationContainer } from '@react-navigation/native'

// Recommended by React Native Testing Library to import all app providers
const AllTheProviders = ({ children }) => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>{children}</NavigationContainer>
      </ApplicationProvider>
    </>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
