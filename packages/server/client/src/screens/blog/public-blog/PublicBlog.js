import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../../home/component/navbar';
import CommentContainer from './comment';
import Footer from '../../../common/footer';
import client from '../../../socket';
import { ENDPOINT } from '../../../config';
import { Spinner, SocialShare } from '../../../common';
import { getName } from '../../../common/utility-functions';
import { RoundPicture } from '../../../components';
import BlogCoverImage from './BlogCoverImage';
import * as actions from '../../../actions';
import clientQuery from '../../../clientConfig';
import { GET_BLOG } from '../../../queries';

// const file = require('../../../assets/icons/64w/uploadicon64.png');

class PublicBlog extends React.Component {
  state = {
    blogId: null,
    apis: {},
    data: {},
    loading: true,
  };

  async componentDidMount() {
    const { account, match, updateNav } = this.props;
    try {
      let apis = {};
      let uid;
      if (account.user) {
        apis = await client.scope('Mentee');
        uid = account.user.id;
      }
      const res = await clientQuery.query({ query: GET_BLOG, variables: { blogSlug: match.params.blogSlug, userSlug: match.params.userSlug }, fetchPolicy: 'network-only' });
      if (res) {
        this.setState({
          data: res.data.getBlog,
          apis,
          blogId: res.data.getBlog.id,
          loading: false,
        });
        updateNav({ schema: 'page', data: { title: res.data.getBlog.title } });
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  async componentWillReceiveProps(prevProps) {
    const { account } = this.props;
    if (account.user !== prevProps.account.user) {
      try {
        const apis = await client.scope('Mentee');
        this.setState({ apis });
      } catch (e) {
        console.log('Error', e);
      }
    }
  }

  componentWillUnmount() {
    const { updateNav } = this.props;
    updateNav({ schema: 'page', data: { title: 'Proper Class' } });
  }

  createMarkup = (val) => {
    return { __html: val };
  }

  render() {
    const { blogId, apis, data, loading } = this.state;
    console.log("apis in public blog", apis);
    if (loading) {
      return <Spinner />;
    }
    const { account } = this.props;
    // const user = data.userDetails.find(obj => obj.user.id === data.blog.userId);
    const { user } = data;

    // console.log('data in public profile', user);
    const imgUrl = user.userDetail && user.userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/profile/${user.userDetail.image}` : '/assets/icons/64w/uploadicon64.png';
    const { userDetails } = user;
    return (
      <>
        <Navbar />
        <div className="public-blog">
          <BlogCoverImage blog={data} />
          <div className="public-blog-title">
            <h1>
              {
                data.title
              }
            </h1>
            {/* <p></p> */}
            <div className="author-user">
              <div className="auth-con">
                <div className="profile-icon">
                  <RoundPicture imgUrl={imgUrl} />
                </div>
                <div className="author-detail">
                  <Link key={user.id} to={`/user/${user.slug}`}>{getName(user)}</Link>
                  <span>
                    {new Date(parseInt(data.timeStamp, 10)).toDateString()}
                  </span>
                </div>
              </div>
              <SocialShare url={window.location.href} />
            </div>
          </div>
          <div className="public-blog-content">
            <div
              id="blogContent"
              // eslint-disable-next-line react/no-danger

              dangerouslySetInnerHTML={this.createMarkup(data.content)}
            />

          </div>
          <CommentContainer
            imgUrl={imgUrl}
            account={account}
            apis={apis}
            users={userDetails}
            comments={data.blogComment}
            likes={data.blogLike}
            blogId={blogId}
          />
        </div>
        <Footer />
      </>
    );
  }
}

PublicBlog.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(PublicBlog);
