/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DO_SEARCH } from '../../../../queries';
import * as actions from '../../../../actions';
import FilterToolbar from './FilterToolbar';
import Navbar from '../navbar';
import ResultList from './ResultList';
import Footer from '../../../../common/footer';
import { Spinner } from '../../../../common';
import BlogResult from './BlogResult';
import client from '../../../../clientConfig';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: {}, changeStyle: false };
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.fireScroll, { passive: true });
    const { navigate, updateNav } = this.props;
    updateNav({ schema: 'mainNav', data: { name: 'search' } });
    this.getSearchResult(navigate.search);
  }

  getSearchResult = async (obj) => {
    try {
      const { data } = await client.query({ query: DO_SEARCH, variables: { keyword: obj.key, country: obj.country, industry: obj.industry } });
      console.log('data and obj', obj, data);
      this.setState({
        data,
        loading: false,
      });
    } catch (e) {
      console.log('Error', e);
    }
  }

  fireScroll = () => {
    const { changeStyle } = this.state;
    if (window.scrollY > 65 && !changeStyle) {
      this.setState({
        changeStyle: true,
      });
    }
    if (window.scrollY < 65 && changeStyle) {
      this.setState({
        changeStyle: false,
      });
    }
  }

  filterSearch = (data) => {
    console.log('data', data);
    const { updateNav } = this.props;
    updateNav({ schema: 'search', data });
    this.getSearchResult(data);
    return { response: 200 };
  }

  render() {
    const { navigate } = this.props;
    const { loading, data, changeStyle } = this.state;
    // console.log('search render caled', data);
    return loading ? <Spinner /> : (
      <div>
        <Navbar className={!changeStyle ? 'pcm-nav' : ''} />
        <div className="search-result">
          <FilterToolbar searchKey={navigate.search.key} filterSearch={this.filterSearch} />
          <ResultList data={data.doSearch.users} />
          <BlogResult data={data.doSearch.blogs} />
        </div>
        <Footer />
      </div>
    );
  }
}

SearchResult.propTypes = {
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(SearchResult);
