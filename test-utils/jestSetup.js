jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// Mock Rick and Morty SDK
jest.mock('../app/utils/api/rnmApi.js', () => {
  const actualSdk = jest.requireActual('../app/utils/api/rnmApi.js')
  const { sleep } = jest.requireActual('../app/utils/utilityFunctions.js')

  return {
    __esModule: true,
    default: {
      ...actualSdk.default,
      getCharacters: async ({ page, queryFilters = {} }) => {
        await sleep(200)
        const nameFilter = queryFilters.name.trim()
        // return single result if name was passed in filter
        if (nameFilter) {
          return {
            info: {
              count: 1,
              pages: 1,
              next: null,
              prev: null,
            },
            results: [
              {
                id: 2,
                name: `${nameFilter}`,
                status: 'Alive',
                species: 'Human',
                type: '',
                gender: 'Male',
                origin: {
                  name: 'Earth',
                  url: 'https://rickandmortyapi.com/api/location/1',
                },
                location: {
                  name: 'Earth',
                  url: 'https://rickandmortyapi.com/api/location/20',
                },
                image:
                  'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
                episode: [
                  'https://rickandmortyapi.com/api/episode/1',
                  'https://rickandmortyapi.com/api/episode/2',
                  // ...
                ],
                url: 'https://rickandmortyapi.com/api/character/2',
                created: '2017-11-04T18:50:21.651Z',
              },
            ],
          }
        }
        // return pageLimit amount of results for get all with no filters
        return {
          info: {
            count: 826,
            pages: 42,
            next: `https://rickandmortyapi.com/api/character/?page=${page + 1}`,
            prev: null,
          },
          results: [
            {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth',
                url: 'https://rickandmortyapi.com/api/location/1',
              },
              location: {
                name: 'Earth',
                url: 'https://rickandmortyapi.com/api/location/20',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
              ],
              url: 'https://rickandmortyapi.com/api/character/1',
              created: '2017-11-04T18:48:46.250Z',
            },
            {
              id: 2,
              name: 'Morty Smith',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth',
                url: 'https://rickandmortyapi.com/api/location/1',
              },
              location: {
                name: 'Earth',
                url: 'https://rickandmortyapi.com/api/location/20',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
                // ...
              ],
              url: 'https://rickandmortyapi.com/api/character/2',
              created: '2017-11-04T18:50:21.651Z',
            },
          ],
        }
      },
      getCharacterById: async id => {
        if (!id) return null
        await sleep(200)
        return {
          id: id,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            // ...
          ],
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:50:21.651Z',
        }
      },
      getFullCharacterDetailById: async id => {
        if (!id) return null
        await sleep(200)
        return {
          character: {
            id: id,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth',
              url: 'https://rickandmortyapi.com/api/location/1',
            },
            location: {
              name: 'Earth',
              url: 'https://rickandmortyapi.com/api/location/20',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            episode: [
              'https://rickandmortyapi.com/api/episode/1',
              'https://rickandmortyapi.com/api/episode/28',
            ],
            url: 'https://rickandmortyapi.com/api/character/2',
            created: '2017-11-04T18:50:21.651Z',
          },
          origin: {
            id: 1,
            name: 'Earth',
            type: 'Planet',
            dimension: 'Dimension C-137',
            residents: [
              'https://rickandmortyapi.com/api/character/1',
              'https://rickandmortyapi.com/api/character/2',
            ],
            url: 'https://rickandmortyapi.com/api/location/1',
            created: '2017-11-10T12:42:04.162Z',
          },
          location: {
            id: 1,
            name: 'Earth',
            type: 'Planet',
            dimension: 'Dimension C-137',
            residents: [
              'https://rickandmortyapi.com/api/character/1',
              'https://rickandmortyapi.com/api/character/2',
            ],
            url: 'https://rickandmortyapi.com/api/location/1',
            created: '2017-11-10T12:42:04.162Z',
          },
          episodes: [
            {
              id: 1,
              name: 'Pilot',
              air_date: 'December 2, 2013',
              episode: 'S01E01',
              characters: [
                'https://rickandmortyapi.com/api/character/1',
                'https://rickandmortyapi.com/api/character/2',
              ],
              url: 'https://rickandmortyapi.com/api/episode/1',
              created: '2017-11-10T12:56:33.798Z',
            },
            {
              id: 28,
              name: 'The Ricklantis Mixup',
              air_date: 'September 10, 2017',
              episode: 'S03E07',
              characters: [
                'https://rickandmortyapi.com/api/character/1',
                'https://rickandmortyapi.com/api/character/2',
              ],
              url: 'https://rickandmortyapi.com/api/episode/28',
              created: '2017-11-10T12:56:36.618Z',
            },
          ],
        }
      },
      pageLimit: 2,
    },
  }
})
