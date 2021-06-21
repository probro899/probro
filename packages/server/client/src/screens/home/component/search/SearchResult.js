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
import HeaderBanner from '../../../../common/HeaderBanner';
import clientConfig from '../../../../clientConfig';
import cookies from '../../../../redux/account/cookies';
import PopularOnPc from '../../../../common/PopularOnPc';
import { getUrlParams, setUrlParams } from '../../../../common/utility-functions/getSetUrlParams';
import ReactHelmet from '../../../../common/react-helmet';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    const initialParams = { country: 'Nepal', searchKey: '', industry: '', skill: '' };
    const params = getUrlParams();
    this.state = { allParams: { ...initialParams, ...params }, apis: {}, loading: true, data: {}, changeStyle: false };
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.fireScroll, { passive: true });
    const { updateNav, account } = this.props;
    const { allParams } = this.state;
    const apis = account.user ? await client.scope('Mentee') : {};
    this.setState({ apis });
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
    setUrlParams(obj);
    try {
      const sessionId = await cookies.get('pc-session');
      const { data } = await clientConfig.query({ query: DO_SEARCH, variables: { sessionId, keyword: obj.searchKey || '', country: obj.country, industry: obj.industry, skill: obj.skill } });
      this.setState({ data, loading: false });
    } catch (e) {
      console.log('Error', e);
    }
  }

  fireScroll = () => {
    const { changeStyle } = this.state;
    if (window.scrollY > 65 && !changeStyle) this.setState({ changeStyle: true });
    if (window.scrollY < 65 && changeStyle) this.setState({ changeStyle: false });
  }

  filterSearch = (data) => {
    this.getSearchResult(data);
    return { response: 200 };
  }

  render() {
    const { loading, data, changeStyle, apis, allParams } = this.state;
    const { match } = this.props;
    if (loading) return <Spinner wClass="spinner-wrapper" />;
    return (
      <>
        <ReactHelmet match={match} />
        <Navbar className={!changeStyle ? 'pcm-nav' : ''} />
        <HeaderBanner
          title="Make Connections"
          subTitle="Connect with the professional mentors."
          bgColor="#0f2e54"
        />
        <div className="search-result pc-container">
          <FilterToolbar allParams={allParams} callback={this.filterSearch} />
          <div className="search-content">
            <div className="search-content-left">
              <div className="result-wrapper">
                <ResultList apis={apis} data={data.doSearch.users} { ...this.props } />
              </div>
            </div>
            <PopularOnPc
              mentors={data.doSearch.popularUsers}
              organizations={data.doSearch.organizations}
            />
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

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { ...actions })(SearchResult);
