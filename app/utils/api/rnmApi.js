/*
 * Rick and Morty API SDK
 */

import ApiManager from './ApiManager'

const baseUrl = 'https://rickandmortyapi.com/api'

const CHARACTER_FILTERS = ['name', 'status', 'species', 'type', 'gender']

const RickAndMortySdk = {
  getLocationById: async id => {
    return ApiManager.get({ url: `${baseUrl}/location/${id}` })
  },
  getEpisodeById: async id => {
    return ApiManager.get({ url: `${baseUrl}/episode/${id}` })
  },
  getCharacterById: async id => {
    return ApiManager.get({ url: `${baseUrl}/character/${id}` })
  },
  getMultipleCharactersById: async ids => {
    return ApiManager.get({ url: `${baseUrl}/character/${ids.toString()}` })
  },
  getCharacters: async ({ page = 1, queryFilters = {} }) => {
    let query = `?page=${page}`
    // build a query string based on query and allowed params
    if (queryFilters && typeof queryFilters === 'object') {
      for (const filter of CHARACTER_FILTERS) {
        query += queryFilters?.[filter]
          ? `&${filter}=${encodeURIComponent(
              queryFilters[filter]?.toString()?.trim(),
            )}`
          : ''
      }
    }
    return ApiManager.get({ url: `${baseUrl}/character/${query}` })
  },
  getFullCharacterDetailById: async id => {
    // get character, their origin, location and episodes in one function call
    const character = await ApiManager.get({
      url: `${baseUrl}/character/${id}`,
    })
    if (!character) return null
    // fetch location
    let location
    if (character.location?.url) {
      location = await ApiManager.get({ url: character.location.url })
    }
    // fetch origin
    let origin
    if (character.origin?.url) {
      origin = await ApiManager.get({ url: character.origin.url })
    }
    let episodes = []
    if (Array.isArray(character.episode) && character.episode.length > 0) {
      // fetch all episodes simultaneously (brute forced)
      // await Promise.all(
      //   character.episode.map(async epUrl => {
      //     const ep = await ApiManager.get({ url: epUrl })
      //     if (ep) episodes.push(ep)
      //   }),
      // )
      //
      // extract episode ids and then fetch multiple episodes in single request (efficient and elegant)
      const episodeIds = character.episode.map(
        epUrl => epUrl.replace(`${baseUrl}/episode/`, ''), // extract id from url
      )
      episodes = await ApiManager.get({
        url: `${baseUrl}/episode/${episodeIds.toString()}`,
      })
    }
    return { character, location, origin, episodes }
  },
  pageLimit: 20,
}

export default RickAndMortySdk
