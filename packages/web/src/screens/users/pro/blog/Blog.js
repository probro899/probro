import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import * as actions from '../../../../actions';
import { DeletePopOver } from '../../../../common';
import client from '../../../../socket';
import { MoreButton } from '../../../../components';

class Blogs extends Component {
  state = {
    createBlog: false,
    editBlog: false,
    deletePopOverIsOpen: false,
    blogId: null,
    apis: {},
  };

  async componentWillMount() {
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
    if (type === 'confirm') {
      await apis.deleteBlog({ id: blogId });
      this.setState({
        deletePopOverIsOpen: false,
        blogId: '',
      });
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
        { createBlog && <Redirect push to={`/create-blog/${account.sessionId}`} /> }
        { blogId && editBlog && <Redirect push to={`/edit-blog/${account.sessionId}/${blogId}`} /> }
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
            database.Blog.allIds.map((id, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="blog-container" key={index}>
                  <div className="img-container">
                    <MoreButton onMore={this.onMore} id={id} />
                    <img
                      alt="test"
                      src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2555&q=80"
                    />
                  </div>
                  <div className="detail-container">
                    <div className="blog-title">
                      <p className="title">{database.Blog.byId[id].title}</p>
                      <p style={{ textAlign: 'right', width: '100%' }}>
                        <span className="pc-date">
                          {new Date(database.Blog.byId[id].timeStamp).toDateString()}
                        </span>
                      </p>
                    </div>
                    <div className="blog-author">
                      <Link to="#">
                        {database.User.byId[database.Blog.byId[id].userId].middleName
                          ? `${database.User.byId[database.Blog.byId[id].userId].firstName} ${database.User.byId[database.Blog.byId[id].userId].middleName} ${database.User.byId[database.Blog.byId[id].userId].lastName}` : `${database.User.byId[database.Blog.byId[id].userId].firstName} ${database.User.byId[database.Blog.byId[id].userId].lastName}`}
                      </Link>
                    </div>
                  </div>
                </div>
              );
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
