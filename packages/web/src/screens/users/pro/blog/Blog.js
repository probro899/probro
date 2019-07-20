import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import * as actions from '../../../../actions';
import { DeletePopOver } from '../../../../common';
import { MoreButton } from '../../../../components';

class Blogs extends Component {
  state = {
    createBlog: false,
    deletePopOverIsOpen: false,
  };

  componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'sideNav',
      data: { name: 'Blog' },
    });
  }

  deleteBlog = () => {

  }

  // handles the edit and delete of the blog
  onMore = (type, id) => {
    if (type === 'delete') {
      this.setState({
        deletePopOverIsOpen: true,
      });
    }
  }

  render() {
    const { createBlog, deletePopOverIsOpen } = this.state;
    const { account } = this.props;
    const { database } = this.props;
    return (
      <div className="blogs">
        { createBlog && <Redirect push to={`/write-blog/${account.sessionId}`} /> }
        <DeletePopOver
          isOpen={deletePopOverIsOpen}
          action={this.deleteBlog}
          name="New Blog"
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
          <div className="blog-container">
            <div className="img-container">
              <MoreButton onMore={this.onMore} id={1} />
              <img
                alt="test"
                src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2555&q=80"
                height="170px"
              />
            </div>
            <div className="detail-container">
              <div className="blog-title">
                <span>Title of the Blog </span>
                <small> 1st april 2016</small>
              </div>
              <div className="blog-author">
                <span>-Blog Author</span>
              </div>
            </div>
          </div>
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
