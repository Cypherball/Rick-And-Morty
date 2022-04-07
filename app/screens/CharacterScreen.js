import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import TopNavbar from '../components/navbar/TopNavbar'
import PortalLoader from '../components/loaders/PortalLoader'
import RickAndMortySdk from '../utils/api/rnmApi'

const CharacterScreen = ({ route, navigation }) => {
  const { characterId } = route.params
  const theme = useTheme()

  const [loading, setLoading] = useState(false)

  const [characterData, setCharacterData] = useState(null)
  const [locationData, setLocationData] = useState(null)
  const [originData, setOriginData] = useState(null)
  const [episodeData, setEpisodeData] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    if (loading || !characterId) return
    setLoading(true)
    const data = await RickAndMortySdk.getFullCharacterDetailById(characterId)
    if (!data) return setLoading(false)
    setCharacterData(data?.character || null)
    setOriginData(data?.origin || null)
    setLocationData(data?.location || null)
    setEpisodeData(data?.episodes || [])
    setLoading(false)
  }

  const getStatusColor = () => {
    switch (characterData?.status) {
      case 'Alive':
        return theme['color-success-500']
      case 'Dead':
        return theme['color-danger-500']
      default:
        return theme['color-warning-500']
    }
  }

  const renderCharacterInfo = () => (
    <Layout level={'3'} style={styles.characterInfoContainer}>
      <Text
        category={'h3'}
        style={{ textAlign: 'center', paddingTop: 0 }}
        status="primary">
        {characterData.name}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Text
          category={'c1'}
          style={{ marginRight: 8, color: getStatusColor() }}>
          <Text category={'c1'} appearance={'hint'}>
            Status:
          </Text>
          {` ${characterData.status}`}
        </Text>
        <Text category={'c1'} style={{ marginRight: 8 }}>
          <Text category={'c1'} appearance={'hint'}>
            Gender:
          </Text>
          {` ${characterData.gender}`}
        </Text>
        <Text category={'c1'} style={{ marginRight: 8 }}>
          <Text category={'c1'} appearance={'hint'}>
            Species:
          </Text>
          {` ${characterData.species}`}
        </Text>
      </View>
      {characterData.type ? (
        <Text category={'c1'} style={{ marginRight: 8 }}>
          <Text category={'c1'} appearance={'hint'}>
            Type/Subspecies:
          </Text>
          {` ${characterData.type}`}
        </Text>
      ) : null}
    </Layout>
  )

  const renderOriginInfo = () => (
    <Layout level={'1'} style={{ padding: 16 }}>
      <Text category={'h5'}>Origin</Text>

      {originData ? (
        <>
          <View style={styles.locationDetailsRow}>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Name:
              </Text>
              {` ${originData.name}`}
            </Text>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Type:
              </Text>
              {` ${originData.type}`}
            </Text>
          </View>

          <View style={styles.locationDetailsRow}>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Dimension:
              </Text>
              {` ${originData.dimension}`}
            </Text>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Resident Count:
              </Text>
              {` ${originData.residents?.length}`}
            </Text>
          </View>
        </>
      ) : (
        <Text
          appearance={'hint'}
          category="s1"
          style={{ textAlign: 'center', marginTop: 8 }}>
          Origin Data Not Found
        </Text>
      )}
    </Layout>
  )

  const renderLocationInfo = () => (
    <Layout level={'2'} style={{ padding: 16 }}>
      <Text category={'h5'}>Last Known Location</Text>

      {locationData ? (
        <>
          <View style={styles.locationDetailsRow}>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Name:
              </Text>
              {` ${locationData.name}`}
            </Text>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Type:
              </Text>
              {` ${locationData.type}`}
            </Text>
          </View>

          <View style={styles.locationDetailsRow}>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Dimension:
              </Text>
              {` ${locationData.dimension}`}
            </Text>
            <Text category={'s1'} style={styles.locationDetailsRowText}>
              <Text category={'s1'} appearance={'hint'}>
                Resident Count:
              </Text>
              {` ${locationData.residents?.length}`}
            </Text>
          </View>
        </>
      ) : (
        <Text
          appearance={'hint'}
          category="s1"
          style={{ textAlign: 'center', marginTop: 8 }}>
          Location Data Not Found
        </Text>
      )}
    </Layout>
  )

  const renderEpisodeInfo = () => (
    <Layout level={'1'} style={{ padding: 16 }}>
      <Text category={'h5'}>Episode Appearances</Text>

      {episodeData.length ? (
        episodeData.map(ep => (
          <View key={ep?.id}>
            <View style={{ marginVertical: 4 }}>
              <Text category={'s1'} style={styles.locationDetailsRowText}>
                {`${ep?.episode} - ${ep?.name}`}
              </Text>
              <Text category={'s1'} style={styles.locationDetailsRowText}>
                <Text category={'s1'} appearance={'hint'}>
                  Aired On:
                </Text>
                {` ${ep.air_date}`}
              </Text>
            </View>
            <Divider />
          </View>
        ))
      ) : (
        <Text
          appearance={'hint'}
          category="s1"
          style={{ textAlign: 'center', marginTop: 8 }}>
          No Episodes Found
        </Text>
      )}
    </Layout>
  )

  return (
    <Layout style={styles.container}>
      <TopNavbar
        title={'Character'}
        subtitle={characterData?.name}
        showBackButton
      />
      {loading ? (
        <View style={styles.centeredContent}>
          <PortalLoader />
        </View>
      ) : !characterData ? (
        <View style={styles.centeredContent}>
          <Text category={'h5'} status="warning">
            {`Oops, Couldn't find data for character with ID: ${characterId}`}
          </Text>
        </View>
      ) : (
        <ScrollView>
          <Image
            source={{ uri: characterData.image }}
            style={styles.imageStyle}
          />
          {renderCharacterInfo()}
          {renderOriginInfo()}
          {renderLocationInfo()}
          {renderEpisodeInfo()}
        </ScrollView>
      )}
    </Layout>
  )
}

export default CharacterScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  centeredContent: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: '#f0e14a',
  },
  characterInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  locationDetailsRowText: {
    flex: 1,
    paddingHorizontal: 8,
  },
})
