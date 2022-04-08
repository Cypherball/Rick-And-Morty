/**
 * @format
 */

import React from 'react'
import 'react-native'

// Note: test renderer must be required after react-native.
import { render, act } from '../../../test-utils'
import RickAndMortySdk from '../../utils/api/rnmApi' // Loads Mock SDK!!!
import { sleep } from '../../utils/utilityFunctions'
import CharacterScreen from '../CharacterScreen'

it('Renders Character Screen Correctly Initially', async () => {
  const page = render(
    <CharacterScreen route={{ params: { characterId: '1' } }} />,
  )

  // expect(page).toMatchSnapshot()

  await act(async () => {
    page.getByTestId('topNavbar')

    // loader should be visible
    page.getByTestId('portalLoader')
  })
})

it('Renders Character Screen Correctly After State Updates', async () => {
  const characterId = '1'
  const mockResult = await RickAndMortySdk.getFullCharacterDetailById(
    characterId,
  )

  const page = render(<CharacterScreen route={{ params: { characterId } }} />)

  await act(async () => {
    // expect mocked response texts to not exist
    expect(page.queryAllByText(mockResult.character.name)).toHaveLength(0)
    expect(page.queryAllByTestId('characterScreen.episodeView')).toHaveLength(0)

    // loader should be visible
    page.getByTestId('portalLoader')

    // wait for api call to complete
    await sleep(500)

    // loader should no longer be visible
    expect(page.queryByTestId('portalLoader')).toBeFalsy()

    // expect mocked response texts to be loaded
    // check character name exists
    expect(
      page.queryAllByText(mockResult.character.name).length,
    ).toBeGreaterThan(0)
    // check location name exists
    expect(
      page.queryAllByText(mockResult.location.name).length,
    ).toBeGreaterThan(0)
    // check origin name exists
    expect(page.queryAllByText(mockResult.origin.name).length).toBeGreaterThan(
      0,
    )
    // check episodes count in UI matches mocked response
    expect(page.queryAllByTestId('characterScreen.episodeView')).toHaveLength(
      mockResult.episodes.length,
    )
  })
})
