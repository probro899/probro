import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateNav } from '../../../actions';
import Navbar from '../../home/component/navbar';
import Footer from '../../../common/footer';
import animateProgress from '../../../common/utility-functions/animateProgress';
import HeaderBanner from '../../../common/HeaderBanner';
import { Spinner } from '../../../common';
import { getUrlParams, setUrlParams } from '../../../common/utility-functions/getSetUrlParams';
import SingleArchive from './SingleArchive';
import { BLOG_SEARCH, GET_ARCHIVES } from '../../../queries';
import clientConfig from '../../../clientConfig';
import cookies from '../../../redux/account/cookies';
import Topics from './Topics';
import NotFound from '../../../common/NotFound';
import client from '../../../socket';
import SearchBar from './SearchBar';
import ReactHelmet from '../../../common/react-helmet';

class Archive extends React.Component {
  constructor(props) {
    super(props);
    const params = getUrlParams();
    this.filterRef = React.createRef();
    this.state = {
      loading: true,
      initialFetchedBlogs: [], initialCalled: false,
      searchedBlogs: [],
      searchKey: params.searchKey || '',
      selectedTopics: params.topics ? params.topics.trim().split(' ') : [],
      screenWidth: window.innerWidth, bookmarking: false, apis: null, showTopic: false
    };
  }
 
  async componentDidMount() {
    const { updateNav, account } = this.props;
    const { searchKey, selectedTopics } = this.state;
    window.addEventListener('resize', this.screenResize);
    if (account.user) this.getApis();
    if (!searchKey && selectedTopics.length < 1) {
      this.getBlogInitial();
    } else {
      this.blogSearch(searchKey, selectedTopics);
    }
    updateNav({ schema: 'mainNav', data: { name: 'archive' } });
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps) {
    const { account } = this.props;
    if (account.user && account.user !== prevProps.account.user) this.getApis();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.screenResize);
    window.removeEventListener('click', this.clickHandler, { capture: true });
  }

  getBlogInitial = async () => {
    const { initialCalled } = this.state;
    if (initialCalled) return;
    const sessionId = cookies.get('pc-session');
    const res = await clientConfig.query({ query: GET_ARCHIVES, variables: { sessionId }, fetchPolicy: 'network-only' });
    this.setState({ initialFetchedBlogs: res.data.getArchive || [], initialCalled: true });
  }

  blogSearch = async (searchKey, selectedTopics) => {
    if (!searchKey.trim() && selectedTopics.length < 1) {
      this.getBlogInitial();
      setUrlParams({ searchKey: '', topics: '' });
      return;
    }
    const { updateNav } = this.props;
    animateProgress('start', updateNav);
    const topics = selectedTopics.reduce((acc, i) => acc + i + ' ', '');
    const sessionId = cookies.get('pc-session');
    const res = await clientConfig.query({ query: BLOG_SEARCH, variables: { sessionId, keyword: searchKey, topic: topics.trim() }, fetchPolicy: 'network-only' });
    animateProgress('end', updateNav);
    setUrlParams({ searchKey, topics: topics.trim() });
    this.setState({ searchedBlogs: res.data.blogSearch || [] });
  }

  setSelectedTopics = (list) => {
    const { searchKey } = this.state;
    this.setState({ selectedTopics: list });
    this.blogSearch(searchKey, list);
  }

  screenResize = _.debounce(() => {
    this.setState({ screenWidth: window.innerWidth });
  }, 500)

  getApis = async () => {
    const apisRes = await client.scope('Mentee');
    this.setState({ apis: apisRes });
  }

  clickHandler = (e) => {
    const { showTopic } = this.state;
    if (showTopic && this.filterRef && !this.filterRef.current.contains(e.target)) this.toggleShowTopic();
  }

  toggleShowTopic = () => {
    const { showTopic } = this.state;
    this.setState({ showTopic: !showTopic });
    if (showTopic) {
      window.removeEventListener('click', this.clickHandler, { capture: true });
    } else {
      setTimeout(() => window.addEventListener('click', this.clickHandler, { capture: true }), 300);
    }
  }

  bookmarkBlog = async (blogId, bookmark = null) => {
    const { account, updateNav } = this.props;
    const { bookmarking, apis, initialFetchedBlogs } = this.state;
    if (bookmarking) return;
    if (account.user) {
      this.setState({ bookmarking: true });
      if (bookmark) {
        const res = await apis.deleteBlogBookmark({ id: bookmark.id });
        if (res) {
          this.setState({
            initialFetchedBlogs: initialFetchedBlogs.map(o => {
              if (o.id === blogId) return { ...o, bookmark: null };
              return o;
            }),
            bookmarking: false,
          });
        }
      } else {
        const res = await apis.addBlogBookmark({ userId: account.user.id, blogId });
        if (res) {
          this.setState({
            initialFetchedBlogs: initialFetchedBlogs.map(o => {
              if (o.id === blogId) return { ...o, bookmark: { id: res } };
              return o;
            }),
            bookmarking: false,
          });
        }
      }
    } else {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Sorry, you have to login to save an archive item.', intent: 'error' } });
    }
  }

  searchKeyChange = (val) => {
    const { selectedTopics } = this.state;
    this.setState({ searchKey: val });
    this.blogSearch(val, selectedTopics);
  }

  render() {
    const { initialFetchedBlogs, searchedBlogs, loading, screenWidth, selectedTopics, searchKey, showTopic } = this.state;
    if (loading) return <Spinner wClass="spinner-wrapper" />;
    const blogs = (!searchKey.trim() && selectedTopics.length < 1) ? initialFetchedBlogs : searchedBlogs;
    return (
      <>
        <ReactHelmet {...this.props} />
        <Navbar />
        <HeaderBanner title="Archive" subTitle="Filter, Search and Read from topic of your interest" />
        <div className="archive pc-container">
          <div className="hidden"></div>
          <div className="archive-wrapper">
            <div className="ar-content">
              <div className="ar-left">
                <SearchBar
                  searchKey={searchKey}
                  topicCount={selectedTopics.length}
                  toggleFilter={this.toggleShowTopic}
                  onChange={this.searchKeyChange}
                />
                {screenWidth < 1200 && showTopic && (
                  <div ref={this.filterRef} className="mobile-topic-section">
                    <Topics selectedTopics={selectedTopics} setSelectedTopics={this.setSelectedTopics} />
                  </div>
                )}
                {blogs.length > 0 ? blogs.map((obj, idx) => <SingleArchive bookmarkBlog={this.bookmarkBlog} key={`arch-${idx}`} obj={obj} />) : <NotFound />}
              </div>
              {
                screenWidth > 1199 && (
                  <div className="ar-right">
                    <Topics selectedTopics={selectedTopics} setSelectedTopics={this.setSelectedTopics} />
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ account }) => ({ account });
export default connect(mapStateToProps, { updateNav })(Archive);
