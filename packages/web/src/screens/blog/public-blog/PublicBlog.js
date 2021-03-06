import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Navbar from '../../home/component/navbar';
import CommentContainer from './comment';
import Footer from '../../../common/footer';
import client from '../../../socket';
import { ENDPOINT } from '../../../config';
import { Spinner, SocialShare } from '../../../common';
import { RoundPicture } from '../../../components';
import BlogCoverImage from './BlogCoverImage';
import * as actions from '../../../actions';

const file = require('../../../assets/icons/64w/uploadicon64.png');

class PublicBlog extends React.Component {
  state={
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
      const res = await axios.get(`${ENDPOINT}/web/get-blog?blogId=${match.params.blogSlug}&userId=${match.params.userSlug}&uid=${uid}`);
      if (res) {
        this.setState({
          data: res.data,
          apis,
          blogId: res.data.blog.id,
          loading: false,
        });
        updateNav({ schema: 'page', data: { title: res.data.blog.title } });
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  async componentDidUpdate(prevProps) {
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
    if (loading) {
      return <Spinner />;
    }
    const { account } = this.props;
    const user = data.userDetails.find(obj => obj.user.id === data.blog.userId);
    const imgUrl = user.userDetail && user.userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.user.id, 10)}/profile/${user.userDetail.image}` : file;
    const { userDetails } = data;
    return (
      <>
        <Navbar />
        <div className="public-blog">
          <div className="public-blog-title">
            <p>
              {
                data.blog.title
              }
            </p>
            <div className="author-user">
              <div className="auth-con">
                <div className="profile-icon">
                  <RoundPicture imgUrl={imgUrl} />
                </div>
                <div className="author-detail">
                  <Link key={user.user.id} to={`/user/${user.user.slug}`}>
                    {`${user.user.firstName} ${user.user.middleName ? `${user.user.middleName} ` : ''}${user.user.lastName}`}
                  </Link>
                  <span>
                    {new Date(data.blog.timeStamp).toDateString()}
                  </span>
                </div>
              </div>
              <SocialShare url={window.location.href} />
            </div>
          </div>
          <BlogCoverImage blog={data} />
          <div className="public-blog-content">
            <div
              id="blogContent"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={this.createMarkup(data.blog.content)}
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
