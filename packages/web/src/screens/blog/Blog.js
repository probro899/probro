import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import * as actions from '../../actions';
import { DeletePopOver } from '../../common';
import client from '../../socket';
import getName from '../../common/utility-functions/getName';
import { MoreButton } from '../../components';
import { ENDPOINT } from '../../config';

const blogImg = require('../../assets/blog-img.jpg');

const EachBlog = ({ onMore, users, obj }) => {
  const coverImage = obj.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(obj.userId, 10)}/blog/${obj.coverImage}` : blogImg;
  return (
    <div className="blog-container">
      <div className="img-container">
        <MoreButton onMore={onMore} id={obj.id} />
        <img
          alt="test"
          src={coverImage}
        />
      </div>
      <div className="detail-container">
        <div className="blog-author">
          <Link to={`/user/${users.byId[obj.userId].slug}`}>
            {getName(users.byId[obj.userId])}
          </Link>
        </div>
        <div className="blog-title">
          <p className="title">
            <Link target="_blank" to={`/blog/${users.byId[obj.userId].slug}/${obj.slug}`}>
              {obj.title}
            </Link>
          </p>
          <p style={{ textAlign: 'right', width: '100%' }}>
            <span className="pc-date">
              {new Date(obj.timeStamp).toDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

class Blogs extends Component {
  state = {
    createBlog: false,
    editBlog: false,
    deletePopOverIsOpen: false,
    blogId: null,
    apis: {},
  };

  async componentDidMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentor');
    this.setState({
      apis,
    });
    updateNav({
      schema: 'sideNav',
      data: { name: 'Blog' },
    });
  }

  deleteBlog = async (type) => {
    const { apis, blogId } = this.state;
    const { deleteDatabaseSchema } = this.props;
    if (type === 'confirm') {
      await apis.deleteBlog({ id: blogId });
      this.setState({
        deletePopOverIsOpen: false,
        blogId: '',
      });
      deleteDatabaseSchema('Blog', { id: blogId });
      return;
    }
    this.setState({
      deletePopOverIsOpen: false,
    });
  }

  // handles the edit and delete of the blog
  onMore = (type, id) => {
    if (type === 'delete') {
      this.setState({
        deletePopOverIsOpen: true,
        blogId: id,
      });
    } else if (type === 'edit') {
      this.setState({
        editBlog: true,
        blogId: id,
      });
    }
  }

  render() {
    const { createBlog, deletePopOverIsOpen, blogId, editBlog } = this.state;
    const { account } = this.props;
    const { database } = this.props;
    return (
      <div className="blogs bro-right">
        { createBlog && <Redirect push to={`/create-blog/${account.user.slug}`} /> }
        { blogId && editBlog && <Redirect push to={`/edit-blog/${account.user.slug}/${blogId}`} /> }
        <DeletePopOver
          isOpen={deletePopOverIsOpen}
          action={this.deleteBlog}
          name={blogId ? database.Blog.byId[blogId].title : ''}
        />
        <div className="header">
          <div>
            <span className="title">Blogs </span>
            <small>Manage your blogs here</small>
          </div>
          <div>
            <Button
              className="create-btn"
              text="Create Blog"
              intent="success"
              onClick={() => this.setState({ createBlog: !createBlog })}
            />
          </div>
        </div>
        <div className="blog-list">
          {
            database.Blog.allIds.length === 0 && (
              <div className="pc-no-blogs">
                <p>You have not created any blogs at the moment.</p>
              </div>
            )
          }
          {
            Object.values(database.Blog.byId).filter(b => b.userId === account.user.id).map((obj, index) => {
              return <EachBlog onMore={this.onMore} users={database.User} obj={obj} key={index} />;
            })
          }
        </div>
      </div>
    );
  }
}

Blogs.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Blogs);
