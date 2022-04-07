/*
 * General Axios based API Manager with Error Handling
 */

import axios from 'axios'
import { Alert } from 'react-native'

// add content type to header if header is null
const getHeaders = headers => {
  if (headers && typeof headers === 'object') return headers
  return {
    'Content-Type': 'application/json',
  }
}

const handleError = error => {
  const response = typeof error.response !== 'undefined' ? error.response : null
  console.error(
    '---API MANAGER ERROR HANDLING---\n',
    error,
    JSON.stringify(response?.data),
  )

  if (response) {
    if (typeof response.status !== 'undefined') {
      switch (response.status) {
        case 404:
          Alert.alert(
            'Error',
            "Welp that sucks, we couldn't find what you're looking for...",
          )
          break
        case 405:
          Alert.alert('Error', `GTFO Bro\n\n${error.message}`)
          break
        default:
          Alert.alert(
            'Error',
            `Oops, There was an error :(\n\n${error.message}`,
          )
          break
      }
      return
    }
    Alert.alert(
      'Error',
      `Seems like there was an error.\n\n${JSON.stringify(response.data)}`,
    )
  } else {
    if (error.isAxiosError && error.message === 'Network Error') {
      Alert.alert(
        'Network Error',
        'Uh oh! There seems to be a network issue, please check your connectivity and try again.',
      )
      return
    }
    Alert.alert(
      'Error',
      'Oops, something went wrong.\nPlease try again later...',
    )
  }
}

const ApiManager = {
  get: async ({ url, headers = null, handleErrors = true }) => {
    try {
      const res = await axios.get(url, {
        headers: getHeaders(headers),
      })
      return res.data
    } catch (err) {
      if (handleErrors) {
        handleError(err)
        return null
      }
      throw err
    }
  },
  post: async ({ url, data, headers = null, handleErrors = true }) => {
    try {
      const res = await axios.post(url, data, {
        headers: getHeaders(headers),
      })
      return res.data
    } catch (err) {
      if (handleErrors) {
        handleError(err)
        return null
      }
      throw err
    }
  },
}

export default ApiManager
