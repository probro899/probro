import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../../../home/component/navbar';
import CommentContainer from './comment';
import Footer from '../../../../common/footer';
import client from '../../../../socket';
import * as actions from '../../../../actions';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

class PublicBlog extends React.Component {
  state={
    blogId: null,
    apis: {},
  };

  async componentDidMount() {
    const apis = await client.scope('Mentee');
    const { match } = this.props;
    this.setState({
      apis,
      blogId: parseInt(match.params.blogId, 10),
    });
  }

  createMarkup = (val) => {
    return { __html: val };
  }

  render() {
    const { blogId, apis } = this.state;
    const { database, account, addDatabaseSchema, deleteDatabaseSchema } = this.props;
    const usr = blogId && database.Blog.byId[blogId].userId;
    return !blogId && !usr ? <div /> : (
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
            <div
              id="blogContent"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={this.createMarkup(database.Blog.byId[blogId].content)}
            />
            <div className="right" />
          </div>
          <CommentContainer
            account={account}
            apis={apis}
            database={database}
            blogId={blogId}
            addDatabaseSchema={addDatabaseSchema}
            deleteDatabaseSchema={deleteDatabaseSchema}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

PublicBlog.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(PublicBlog);
