/**
 * A custom animated loading spinner on theme for Rick and Morty
 */

import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'

import PortalLoaderImage from '../../../assets/images/portal_loader.png'

const PortalLoader = () => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    startAnim()
    return () => {
      stopAnim()
    }
  }, [])

  const startAnim = () => {
    // loop animation from values 0 to 1
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }),
    ).start()
  }

  const stopAnim = () => {
    if (spinValue) {
      spinValue.stopAnimation()
    }
  }

  // map 0 to 1 animated values to rotation angle
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View>
      <Animated.Image
        testID={'portalLoader'}
        style={{ transform: [{ rotate: spin }] }}
        source={PortalLoaderImage}
      />
    </View>
  )
}

export default PortalLoader
