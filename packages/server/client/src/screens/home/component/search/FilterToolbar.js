import React from 'react';
import FilterControl from './FilterControl'
import PropTypes from 'prop-types';

class FilterToolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { filterSearch, allParams } = this.props;
    return (
      <div className="filter-toolbar">
        <FilterControl callback={filterSearch} allParams={allParams} />
      </div>
    );
  }
}

FilterToolbar.propTypes = {
  filterSearch: PropTypes.func.isRequired,
  allParams: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FilterToolbar;
