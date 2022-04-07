import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components'

const TopNavbar = ({title, subtitle, showBackButton}) => {
  const navigation = useNavigation()
  const theme = useTheme()

  const BackAction = () => (
    <TopNavigationAction
      onPress={() => navigation.goBack()}
      icon={props => <Icon {...props} name="arrow-back" />}
    />
  )

  return (
    <TopNavigation
      accessoryLeft={showBackButton ? BackAction : null}
      title={title}
      alignment="center"
      subtitle={subtitle ? subtitle : null}
      style={{backgroundColor: theme['color-basic-1000']}}
    />
  )
}

TopNavbar.defaultProps = {
  title: 'Rick and Morty',
  subtitle: null,
  showBackButton: false,
}

export default TopNavbar

const styles = StyleSheet.create({})
