import React from 'react';
import FilterToolbar from './FilterToolbar';
import Navbar from '../navbar';
import ResultList from './ResultList';
import Footer from '../../../../common/footer';

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
        <Footer />
      </div>
    );
  }
}

export default SearchResult;
