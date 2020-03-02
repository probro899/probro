import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import FilterToolbar from './FilterToolbar';
import Navbar from '../navbar';
import ResultList from './ResultList';
import Footer from '../../../../common/footer';
import { ENDPOINT } from '../../../../config';
import { Spinner } from '../../../../common';
import BlogResult from './BlogResult';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: {}, changeStyle: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fireScroll, { passive: true });
    const { navigate } = this.props;
    this.getSearchResult(navigate.search);
  }

  getSearchResult = async (obj) => {
    try {
      const res = await axios.get(`${ENDPOINT}/web/do-search?key=${obj.key}&country=${obj.country}&industry=${obj.industry}`);
      this.setState({
        data: res.data,
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
    const { navigate } = this.props;
    const { loading, data, changeStyle } = this.state;
    console.log(data);
    return loading ? <Spinner /> : (
      <div>
        <Navbar className={!changeStyle ? 'pcm-nav' : ''} />
        <div className="search-result">
          <FilterToolbar searchKey={navigate.search.key} filterSearch={this.filterSearch} />
          <ResultList data={data.users} />
          <BlogResult data={data.blogs} />
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
