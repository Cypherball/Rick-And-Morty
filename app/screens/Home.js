/**
 * Home Screen which displays all the known characters from the TV show `Rick and Morty`.
 * The data is displayed as cards in a 2 column grid Flat List.
 * The data is paginated and loads more data with infinite scroll method.
 * The screen also contains a search bar to search characters by their name. The search text change event is debounced.
 * The Rick and Morty logo at the footer of the screen can be used as a utility `Scroll to Top` Button.
 */

import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Layout, Spinner, Text, useTheme } from '@ui-kitten/components'

import RickAndMortySdk from '../utils/api/rnmApi'
import PortalLoader from '../components/loaders/PortalLoader'
import CharacterCard from '../components/cards/CharacterCard'
import DebouncedSearchInput from '../components/search/DebouncedSearchInput'

// Default data for Supported Character search filters (Can be extended)
const DATA_FILTERS = {
  name: '',
}

const Home = ({ navigation }) => {
  const theme = useTheme()

  // loader states
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  // api data
  const [data, setData] = useState([])

  // pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // character search filters
  const [queryFilters, setFilters] = useState(DATA_FILTERS)

  const flatListRef = useRef(null)

  useEffect(() => {
    loadData()
  }, [queryFilters])

  const loadData = async (_page = 1, refresh = false) => {
    // set loaders appropriately
    if (refresh) setRefreshing(true)
    else _page === 1 ? setLoading(true) : setLoadingMore(true)

    if (!refresh && _page === 1) {
      // reset data
      setData([])
      setTotalPages(0)
    }

    // fetch paginated and filtered data
    const _data = await RickAndMortySdk.getCharacters({
      page: _page,
      queryFilters,
    })
    setTotalPages(_data?.info?.pages || 0)
    if (_data?.results) {
      setData(currentData =>
        _page === 1 || refresh
          ? _data.results
          : [...currentData, ..._data.results],
      )
      // increment page if data fetched succesfully
      setPage(_page + 1)
    }

    if (refresh) setRefreshing(false)
    else _page === 1 ? setLoading(false) : setLoadingMore(false)
  }

  // show a loader or text on empty data
  const renderEmptyList = () => (
    <View style={styles.centeredContent}>
      {loading ? (
        <PortalLoader />
      ) : (
        <Text category={'h5'} status="warning">
          {"Oops, Couldn't find anything :("}
        </Text>
      )}
    </View>
  )

  const renderListItem = ({ _index, item }) => (
    <CharacterCard
      character={item}
      onPress={character =>
        navigation.navigate('CharacterScreen', { characterId: character.id })
      }
    />
  )

  return (
    <Layout style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: theme['color-basic-1000'] }}>
          <DebouncedSearchInput
            placeholder="Search Characters..."
            disabled={refreshing || (loading && !queryFilters.name)}
            searchDebounceTime={500}
            inititalSearchText={queryFilters.name}
            onChangeSearchText={nextValue =>
              setFilters(_filters => ({ ..._filters, name: nextValue.trim() }))
            }
            style={{ marginHorizontal: 10, marginVertical: 8 }}
          />
        </View>

        <FlatList
          ref={flatListRef}
          numColumns={2}
          onRefresh={() => loadData(1, true)}
          contentContainerStyle={{
            flex: data?.length ? null : 1,
            paddingHorizontal: 8,
          }}
          refreshing={refreshing}
          data={data}
          ListEmptyComponent={renderEmptyList}
          renderItem={renderListItem}
          keyExtractor={(item, index) => item.id}
          onEndReached={() => {
            // load more data if not already loading
            if (loading || loadingMore || refreshing || page > totalPages) {
              return
            }
            loadData(page, false)
          }}
          onEndReachedThreshold={0.8}
          ListFooterComponent={() =>
            loadingMore ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 24,
                }}>
                <Spinner />
              </View>
            ) : null
          }
        />
      </View>
      <Layout level={'4'} style={styles.footer}>
        <TouchableOpacity
          testID="home.logoTouchable"
          onPress={() => {
            // scroll flat list back to top when pressed
            if (flatListRef) flatListRef.current.scrollToOffset({ offset: 0 })
          }}>
          <Text style={{ ...styles.title, fontSize: 32 }}>
            Rick <Text style={{ ...styles.title, fontSize: 24 }}>and</Text>{' '}
            Morty
          </Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  )
}

export default Home

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
  },
  footer: {
    // backgroundColor: '#000',
    padding: 16,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  title: {
    fontFamily: 'Get Schwifty', // custom font
    textAlign: 'center',
    color: '#00b0c8',
  },
})
