import React from 'react';
import { FiFilter } from 'react-icons/fi';

const FilterIconWithCount = ({ count, onClick }) => {
  return (
    <div className="topic-filter-icon" onClick={onClick}>
      <span className="topic-filter-icon__count">{count}</span>
      <FiFilter size={20} />
    </div>
  )
}

export default FilterIconWithCount;
