import React from 'react';
import PropTypes from 'prop-types';
import { Control } from '../../../../common';
import filterSchema from './structure';

class FilterToolbar extends React.Component {
  constructor(props) {
    super(props);
    const { searchKey } = this.props;
    this.state = { schema: filterSchema.map(obj => (obj.id === 'key' ? { ...obj, val: searchKey } : obj)) };
  }

  render() {
    const { schema } = this.state;
    const { filterSearch } = this.props;
    return (
      <div className="filter-toolbar">
        <div className="left set">
          <span className="filter-label">
            Filters
          </span>
        </div>
        <div className="center set">
          <Control data={schema} callback={filterSearch} />
        </div>
        <div className="right set" />
      </div>
    );
  }
}

FilterToolbar.propTypes = {
  filterSearch: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
};

export default FilterToolbar;
