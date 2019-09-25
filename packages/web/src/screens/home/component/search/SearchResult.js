import React from 'react';
import axios from 'axios';
import FilterToolbar from './FilterToolbar';
import Navbar from '../navbar';
import ResultList from './ResultList';
import Footer from '../../../../common/footer';
import { ENDPOINT } from '../../../../config';
import { Spinner } from '../../../../common';

class SearchResult extends React.Component {
  state={ loading: true, data: {} };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const res = await axios.get(`${ENDPOINT}/web/do-search?keyword=${match.params.searchKey}`);
      this.setState({
        data: res.data.users,
        loading: false,
      });
    } catch (e) {
      console.log('Error', e);
    }
  }

  render() {
    const { loading, data } = this.state;
    return loading ? <Spinner /> : (
      <div>
        <Navbar />
        <div className="search-result">
          <FilterToolbar />
          <ResultList data={data} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default SearchResult;
