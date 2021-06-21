import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { FiSearch } from 'react-icons/fi';
import { FormTextInput } from '../../../common/Form/FormTextInput';

export default ({ onChange, searchKey }) => {
  const [val, changeVal] = useState('');
  useEffect(() => {
    changeVal(searchKey);
  }, [searchKey]);

  const updateParent = useCallback(_.debounce((val) => {
    onChange(val);
  }, 1000), []);

  const keywordChanged = (e) => {
    changeVal(e.target.value)
    updateParent(e.target.value)
  }

  return (
    <div className="search-course">
      <FormTextInput
        name="searchCourse"
        type="search"
        value={val}
        onChange={keywordChanged}
        placeholder='Search...'
        leftElement={<FiSearch size={20} />}
      />
    </div>
  )
}