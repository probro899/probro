import React, { useEffect, useCallback, useState } from 'react';
import _ from 'lodash';
import { FiSearch } from 'react-icons/fi'
import FilterIconWithCount from './FilterIconWithCount';
import { FormTextInput } from '../../../common/Form/FormTextInput';

export default ({ searchKey, onChange, topicCount, toggleFilter }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setSearchText(searchKey);
  }, [searchKey]);

  const updateParent = useCallback(_.debounce((val) => {
    onChange(val);
  }, 1000), []);

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
    updateParent(e.target.value);
  }

  return (
    <div className="blog-search">
      <FormTextInput
        value={searchText}
        onChange={onSearchChange}
        name="search"
        placeholder="try with keywords"
        leftElement={<FiSearch size={20} />}
        rightElement={<FilterIconWithCount count={topicCount} onClick={toggleFilter} />}
      />
    </div>
  )
}
