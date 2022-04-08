/**
 * Any commonly used functions would be added here
 */

import { Alert, Linking } from 'react-native'

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const openLink = async link => {
  if (!link) return Alert.alert('LINK ERROR', 'Invalid URL provided')
  const supported = await Linking.canOpenURL(link)
  if (supported) {
    await Linking.openURL(link)
  } else {
    console.log("Don't know how to open URI: " + link)
    Alert.alert('LINK ERROR', 'Cannot Open Link')
  }
}
