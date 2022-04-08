/**
 * Rick and Morty React Native App
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import theme from './appTheme.json' // custom theme file for UI Kitten
import MainAppNavigator from './navigators'

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <MainAppNavigator />
      </ApplicationProvider>
    </>
  )
}

export default App
