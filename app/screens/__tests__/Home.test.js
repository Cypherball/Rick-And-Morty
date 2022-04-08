/**
 * @format
 */

import React from 'react'
import 'react-native'

// Note: test renderer must be required after react-native.
import { render, fireEvent, act } from '../../../test-utils'
import RickAndMortySdk from '../../utils/api/rnmApi' // Loads Mock SDK!!!
import { sleep } from '../../utils/utilityFunctions'
import Home from '../Home'

it('Renders Home Page Correctly Initially', async () => {
  const page = render(<Home />)

  // expect(page).toMatchSnapshot()

  await act(async () => {
    page.getByTestId('home.logoTouchable')

    // loader should be visible
    page.getByTestId('portalLoader')

    // verify no character cards exists
    const characterCards = page.queryAllByTestId('characterCard')
    expect(characterCards.length).toEqual(0)
  })
})

it('Renders Home Page Correctly After State Updates', async () => {
  const page = render(<Home />)

  await act(async () => {
    // wait for api call to complete
    await sleep(500)

    page.getByTestId('home.logoTouchable')

    // loader should no longer be visible
    expect(page.queryByTestId('portalLoader')).toBeFalsy()

    // expect mocked page limit cards to be loaded
    expect(page.queryAllByTestId('characterCard').length).toEqual(
      RickAndMortySdk.pageLimit,
    )
  })
})

it('Renders Home Page Correctly After Character Search', async () => {
  const searchText = 'Evil Morty'
  // get mock result of search query
  const mockResult = await RickAndMortySdk.getCharacters({
    page: 1,
    queryFilters: { name: searchText },
  })

  const page = render(<Home />)

  await act(async () => {
    // wait for api call to complete
    await sleep(500)

    page.getByTestId('home.logoTouchable')

    // loader should no longer be visible
    expect(page.queryByTestId('portalLoader')).toBeFalsy()

    const searchInput = page.getByTestId('debouncedSearchInput')

    // ensure no element with search input response as text exists
    expect(page.queryByText(mockResult.results[0].name)).toBeFalsy()

    act(() => {
      // fire text change event on search bar
      fireEvent.changeText(searchInput, searchText)
    })

    // wait for api call to complete
    await sleep(1000)

    const cards = page.queryAllByTestId('characterCard')

    // expect cards number to be equal to mock result length
    expect(cards.length).toEqual(mockResult.results.length)

    // ensure at least one element with text same as name of character from searched response exists
    page.getByText(mockResult.results[0].name)
  })
})
