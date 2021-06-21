import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { DeletePopOver } from '../../../common';
import client from '../../../socket';
import UserBlog from './UserBlog';
import SingleArchive from '../../blog/archive/SingleArchive';
import NotFound from '../../../common/NotFound';
import { Button } from '../../../common/utility-functions/Button/Button';

class BlogList extends Component {
  state = { createBlog: false, bookmarks: [], editBlog: false, deletePopOverIsOpen: false, blogId: null, apis: {} };

  componentDidMount() {
    const { updateNav } = this.props;
    updateNav({ schema: 'sideNav', data: { name: 'Blog' } });
    this.getApis();
  }

  unBookmark = async (blogId, bookmark) => {
    const { apis, bookmarks } = this.state;
    await apis.deleteBlogBookmark({ id: bookmark.id });
    this.setState({ bookmarks: bookmarks.filter(o => o.id !== blogId) });
  }

  getApis = async () => {
    const apis = await client.scope('Mentor');
    this.setState({ apis });
    const res = await apis.getBlogBookmarks();
    this.setState({ bookmarks: res.map(o => ({ ...o.blogDetails, bookmark: { id: o.id } })) });
  }

  deleteBlog = async (type) => {
    const { apis, blogId } = this.state;
    const { deleteDatabaseSchema } = this.props;
    if (type === 'confirm') {
      await apis.deleteBlog({ id: blogId });
      this.setState({ deletePopOverIsOpen: false, blogId: '' });
      deleteDatabaseSchema('Blog', { id: blogId });
      return;
    }
    this.setState({ deletePopOverIsOpen: false });
  }

  // handles the edit and delete of the blog
  onMore = (type, id) => {
    if (type === 'delete') {
      this.setState({ deletePopOverIsOpen: true, blogId: id });
    } else if (type === 'edit') {
      this.setState({ editBlog: true, blogId: id });
    }
  }

  render() {
    const { createBlog, deletePopOverIsOpen, bookmarks, blogId, editBlog } = this.state;
    const { account, User, UserDetail, Blog } = this.props;
    if (createBlog) return <Redirect push to={`/create-blog/${account.user.slug}`} />;
    if (blogId && editBlog) return <Redirect push to={`/edit-blog/${account.user.slug}/${blogId}`} />;
    const isMentor = Object.values(UserDetail.byId).find((obj) => obj.userId === account.user.id && obj.type === 'mentor');
    return (
      <div className="blogs bro-right">
        <div className="blog-wrapper">
          <DeletePopOver
            isOpen={deletePopOverIsOpen}
            action={this.deleteBlog}
            name={blogId ? Blog.byId[blogId].title : ''}
          />
          <div className="header">
            <div>
              <span className="title">Blogs </span>
              <small>Manage your blogs here</small>
            </div>
            {
              isMentor && (
                <div>
                  <Button
                    onClick={() => this.setState({ createBlog: !createBlog })}
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--small"
                    title="Create Blog"
                  />
                </div>
              )
            }
          </div>
          {
            (isMentor || Blog.allIds.length > 0) && (
              <div className="blog-list-wrapper">
                <h2>Your Blogs</h2>
                <div className="blog-list">
                  {Blog.allIds.length < 1 && <div className="pc-no-blogs"><NotFound message="Start writing blogs." /></div>}
                  {
                    Object.values(Blog.byId).filter(b => b.userId === account.user.id).map((obj, index) => {
                      return <UserBlog onMore={this.onMore} users={User} obj={obj} key={`blog-${index}`} />;
                    })
                  }
                </div>
              </div>
            )
          }
          <div className="bookmarked-blog-list">
            <h2>Saved Archives Here</h2>
            <div className="bookmarked-list">
              {bookmarks.length < 1 && <NotFound message="You haven't saved anything to read." />}
              {bookmarks.length > 0 && bookmarks.map((obj, idx) => <SingleArchive bookmarkBlog={this.unBookmark} key={`book-${idx}`} obj={obj} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlogList.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = ({ database, account }) => ({ User: database.User, UserDetail: database.UserDetail, Blog: database.Blog, account });
export default connect(mapStateToProps, { ...actions })(BlogList);
