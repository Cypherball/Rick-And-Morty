/**
 * Top Navigation with centered Title and Subtitle
 * Includes optional back button which uses Navigation to back out
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components'

const TopNavbar = ({ title, subtitle, showBackButton }) => {
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
      testID="topNavbar"
      accessoryLeft={showBackButton ? BackAction : null}
      title={title}
      alignment="center"
      subtitle={subtitle || null}
      style={{ backgroundColor: theme['color-basic-1000'] }}
    />
  )
}

TopNavbar.defaultProps = {
  title: 'Rick and Morty',
  subtitle: null,
  showBackButton: false,
}

export default TopNavbar
