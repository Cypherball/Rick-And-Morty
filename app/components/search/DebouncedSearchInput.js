import React, { useCallback, useState } from 'react'
import debounce from 'lodash.debounce'
import { Icon, Input } from '@ui-kitten/components'
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport'

const DebouncedSearchInput = ({
  inititalSearchText,
  onChangeSearchText,
  searchDebounceTime,
  placeholder,
  disabled,
  style,
}) => {
  const [_searchText, setSearchText] = useState(inititalSearchText)

  // debounce by adding delay to input callback
  const debouncedSearch = useCallback(
    debounce(newValue => onChangeSearchText(newValue), searchDebounceTime),
    [],
  )

  const _onChangeSearchText = text => {
    setSearchText(text)
    debouncedSearch(text)
  }

  // clear input
  const renderClearButton = props => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSearchText('')
        onChangeSearchText('')
      }}>
      <Icon {...props} name={'close-outline'} />
    </TouchableWithoutFeedback>
  )

  return (
    <Input
      value={_searchText}
      onChangeText={_onChangeSearchText}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      accessoryRight={_searchText ? renderClearButton : null}
    />
  )
}

DebouncedSearchInput.defaultProps = {
  searchDebounceTime: 1000,
  inititalSearchText: '',
  disabled: false,
  placeholder: '',
  style: {},
}

export default DebouncedSearchInput
