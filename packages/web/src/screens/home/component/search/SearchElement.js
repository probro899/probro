import React from 'react';
import { Redirect } from 'react-router-dom';

class SearchElement extends React.Component {
  state={
    search: '',
    gotKey: false,
  };

  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  submitSearch = (e) => {
    e.preventDefault();
    const { search } = this.state;
    if (search.replace(/\s/g, '').length !== 0) {
      this.setState({
        gotKey: true,
      });
    }
  }

  render() {
    const { search, gotKey } = this.state;
    return (
      <div className="search-box-container">
        {gotKey && <Redirect push to={`/search/key=${search}`} />}
        <input
          value={search}
          onChange={this.searchChange}
          placeholder="Enter a search Key"
        />
        <button type="submit" onClick={this.submitSearch}>
          Submit
        </button>
        <div>
          <button type="button" className="adv-search">
            Advanced Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchElement;
