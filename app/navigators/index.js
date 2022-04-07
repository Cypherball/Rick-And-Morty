import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import CharacterScreen from '../screens/CharacterScreen'

const Stack = createNativeStackNavigator()

const MainAppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{ headerShown: false, backButtonEnabled: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="CharacterScreen"
          component={CharacterScreen}
          initialParams={{
            characterId: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainAppNavigator
