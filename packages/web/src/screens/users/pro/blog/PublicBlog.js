import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../../../home/component/navbar';
import Comment from './Comment';
import Footer from '../../../../common/footer';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

class PublicBlog extends React.Component {
  state={
    blogId: '',
  };

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      blogId: match.params.blogId,
    });
  }

  componentDidMount() {
    const { blogId } = this.state;
    const { database } = this.props;
    document.getElementById('blogContent').innerHTML = database.Blog.byId[blogId].content;
  }

  createMarkup = (val) => {
    return { __html: val };
  }

  render() {
    const { blogId } = this.state;
    const { database } = this.props;
    const usr = database.Blog.byId[blogId].userId;
    return (
      <div>
        <Navbar />
        <div className="public-blog">
          <div className="public-blog-title">
            <p>
              {
                database.Blog.byId[blogId].title
              }
            </p>
            <div className="author-user">
              <div className="auth-con">
                <img
                  style={{ borderRadius: '50%' }}
                  height="64px"
                  src={file}
                  alt="author blank"
                />
                <div className="author-detail">
                  <Link to={`/user/${usr}/`}>
                    {`${database.User.byId[usr].firstName} ${database.User.byId[usr].middleName ? `${database.User.byId[usr].middleName} ` : ''}${database.User.byId[usr].lastName}`}
                  </Link>
                  <span>
                    {new Date(database.Blog.byId[blogId].timeStamp).toDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="public-blog-content"
          >
            <div className="left" />
            <div id="blogContent" />
            <div className="right" />
          </div>
          <Comment />
        </div>
        <Footer />
      </div>
    );
  }
}

PublicBlog.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({ database: state.database });
export default connect(mapStateToProps)(PublicBlog);
