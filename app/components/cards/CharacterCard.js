/*
 * Character Card Component to display characters from Rick And Morty API
 * Character Schema/Object: https://rickandmortyapi.com/documentation/#character-schema
 */

import { Image, StyleSheet, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { Layout, Text, useTheme } from '@ui-kitten/components'

const CharacterCard = ({ character, onPress }) => {
  const theme = useTheme()

  const getStatusColor = () => {
    switch (character.status) {
      case 'Alive':
        return theme['color-success-500']
      case 'Dead':
        return theme['color-danger-500']
      default:
        return theme['color-warning-500']
    }
  }

  return (
    <View style={{ overflow: 'hidden', flex: 1, margin: 6 }}>
      <TouchableHighlight
        underlayColor={theme['color-primary-500']}
        activeOpacity={0.69}
        onPress={() => onPress(character)}
        style={styles.card}>
        <Layout level={'2'}>
          <Image source={{ uri: character.image }} style={styles.imageStyle} />
          <View style={{ padding: 8 }}>
            <Text numberOfLines={1}>{character.name}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{ ...styles.status, backgroundColor: getStatusColor() }}
              />
              <Text
                numberOfLines={1}
                category={
                  'c1'
                }>{`${character.status} - ${character.species}`}</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text category={'c1'} appearance="hint">
                Origin:
              </Text>
              <Text category={'c1'} numberOfLines={1}>
                {`${character.origin?.name}`}
              </Text>
            </View>
          </View>
        </Layout>
      </TouchableHighlight>
    </View>
  )
}

export default CharacterCard

const styles = StyleSheet.create({
  card: {
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageStyle: {
    aspectRatio: 1,
    backgroundColor: '#f0e14a',
    height: undefined,
    width: '100%',
  },
  status: {
    borderRadius: 200,
    height: 8,
    width: 8,
    marginRight: 8,
  },
})
