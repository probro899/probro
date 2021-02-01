/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../../../socket';
import { DO_SEARCH } from '../../../../queries';
import * as actions from '../../../../actions';
import FilterToolbar from './FilterToolbar';
import Navbar from '../navbar';
import ResultList from './ResultList';
import Footer from '../../../../common/footer';
import { Spinner } from '../../../../common';
import BlogResult from './BlogResult';
import clientConfig from '../../../../clientConfig';
import Popular from './Popular';
import cookies from '../../../../redux/account/cookies';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allParams: {}, apis: {}, loading: true, data: {}, changeStyle: false };
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.fireScroll, { passive: true });
    const { updateNav, account } = this.props;
    const urlParams = new URLSearchParams(window.location.search);

    let allParams = {};
    for (let key of urlParams.keys()) {
      allParams[key] = urlParams.get(key);
    }

    const apis = account.user ? await client.scope('Mentee') : {};
    this.setState({ allParams, apis });

    updateNav({ schema: 'mainNav', data: { name: 'search' } });
    this.getSearchResult(allParams);
  }

  async getSnapshotBeforeUpdate(prevProps, prevState) {
    if (!prevProps.account.user && this.props.account.user) {
      const apis = await client.scope('Mentee');
      this.setState({ apis });
    }
  }

  getSearchResult = async (obj) => {
    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    Object.keys(obj).map(o => {
      search_params.set(o, obj[o]);
    });
    window.history.replaceState(null, null, `?${search_params.toString()}`);
    try {
      const sessionId = await cookies.get('pc-session');
      console.log('session id', sessionId);
      const { data } = await clientConfig.query({ query: DO_SEARCH, variables: { sessionId, keyword: obj.searchKey || '', country: obj.country, industry: obj.industry, skill: obj.skill } });
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
    const { updateNav } = this.props;
    updateNav({ schema: 'search', data });
    this.getSearchResult(data);
    return { response: 200 };
  }

  render() {
    const { loading, data, changeStyle, apis, allParams } = this.state;
    const { database, account } = this.props;
    return loading ? <Spinner /> : (
      <>
        <Navbar className={!changeStyle ? 'pcm-nav' : ''} />
        <div className="search-result">
          <FilterToolbar allParams={allParams} filterSearch={this.filterSearch} />
          <div className='search-content'>
            <div className="search-content-left">
              <div className="result-wrapper">
                <ResultList apis={apis} data={data.doSearch.users}  {...this.props}/>
              </div>
              <div className="popular-blog-wrapper">
                <BlogResult data={data.doSearch.blogs} />
              </div>
            </div>
            <div className='search-content-right'>
              <Popular database={database} account={account} data={data.doSearch.popularUsers} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

SearchResult.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(SearchResult);
