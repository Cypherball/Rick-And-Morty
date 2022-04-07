/*
 * Rick and Morty API SDK
 */

import ApiManager from './ApiManager'

const baseUrl = 'https://rickandmortyapi.com/api'

const CHARACTER_FILTERS = ['name', 'status', 'species', 'type', 'gender']

const RickAndMortySdk = {
  getCharacterById: async id => {
    return ApiManager.get({url: `${baseUrl}/character/${id}`})
  },
  getMultipleCharactersById: async ids => {
    return ApiManager.get({url: `${baseUrl}/character/${ids.toString()}`})
  },
  getCharacters: async ({page = 1, queryFilters = {}}) => {
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
    return ApiManager.get({url: `${baseUrl}/character/${query}`})
  },
  getFullCharacterDetailById: async id => {
    // get character, their origin, location and episodes in one call
    const character = await ApiManager.get({url: `${baseUrl}/character/${id}`})
    if (!character) return null
    // fetch location
    let location
    if (character.location?.url) {
      location = await ApiManager.get({url: character.location.url})
    }
    // fetch origin
    let origin
    if (character.origin?.url) {
      origin = await ApiManager.get({url: character.origin.url})
    }
    // fetch all episodes simultaneously
    const episodes = []
    if (Array.isArray(character.episode)) {
      await Promise.all(
        character.episode?.map(async epUrl => {
          const ep = await ApiManager.get({url: epUrl})
          if (ep) episodes.push(ep)
        }),
      )
    }
    return {character, location, origin, episodes}
  },
  pageLimit: 20,
}

export default RickAndMortySdk
