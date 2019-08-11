import React from 'react';
import FilterToolbar from './FilterToolbar';
import Navbar from '../navbar';
import ResultList from './ResultList';

class SearchResult extends React.Component {
  state={};

  render() {
    return (
      <div>
        <Navbar />
        <div className="search-result">
          <FilterToolbar />
          <ResultList />
        </div>
      </div>
    );
  }
}

export default SearchResult;
