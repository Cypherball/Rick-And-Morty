import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'

import PortalLoaderImage from '../../../assets/images/portal_loader.png'

const PortalLoader = () => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    startAnim()
  }, [])

  const startAnim = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }),
    ).start()
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View>
      <Animated.Image
        style={{ transform: [{ rotate: spin }] }}
        source={PortalLoaderImage}
      />
    </View>
  )
}

export default PortalLoader
