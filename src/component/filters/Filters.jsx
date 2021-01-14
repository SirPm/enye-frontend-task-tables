import React from 'react';

export const Filters = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      Filter:{' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}