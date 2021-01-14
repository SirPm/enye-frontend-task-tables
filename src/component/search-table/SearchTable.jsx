import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

import './search-table.scss';

export const SearchTable = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <div className='search-table'>
      <label htmlFor="searchInput">
        Search:{' '}
      </label>
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        type="search"
        className='search-input'
        id='searchInput'
      />
    </div>
  )
}