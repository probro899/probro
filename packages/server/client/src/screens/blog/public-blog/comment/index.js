import React from 'react';
import PropTypes from 'prop-types';
import { BiComment, BiLike } from 'react-icons/bi';
import { FormTextArea } from '../../../../common/Form/FormTextArea';
import Comment from './Comment';
import { DeletePopOver } from '../../../../common';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';
import { Button } from '../../../../common/utility-functions/Button/Button';
import Card from '../../../../common/Card'
class CommentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: '', liked: null, allComments: [], allLikes: 0, deletePopover: false, commentToDelete: {} };
  }

  componentDidMount() {
    const { likes, account, comments } = this.props;
    this.setState({ allComments: comments, allLikes: likes.filter(l => l.likeType === 'like').length });
    if (account.user) {
      const likeObj = likes.find(o => o.userId === account.user.id);
      if (likeObj) this.setState({ liked: likeObj });
    }
  }

  async getSnapshotBeforeUpdate(prevProps, prevState) {
    const { account, likes } = this.props;
    if (account.user && account.user !== prevProps.account.user) {
      const likeObj = likes.find(o => o.userId === account.user.id);
      if (likeObj) this.setState({ liked: likeObj });
    }
  }

  setComment = (e) => this.setState({ comment: e.target.value });

  submitComment = async () => {
    const { comment, allComments } = this.state;
    const { apis, blogId, account } = this.props;
    try {
      const data = { userId: account.user.id, comment, timeStamp: Date.now(), blogId, broadCastId: `Blog-${blogId}` };
      const res = await apis.addBlogComment(data);
      this.setState({
        allComments: [{ ...data, id: res, user: { ...account.user, userDetail: account.user.userDetails } }, ...allComments],
        comment: '',
      });
    } catch (e) {
      console.log('Error', e);
    }
  }

  saveEditedComment = async (commentText, comment) => {
    const { apis, blogId } = this.props;
    const { allComments } = this.state;
    try {
      const data = { comment: commentText, broadCastId: `Blog-${blogId}` };
      await apis.updateBlogComment([data, { id: comment.id }]);
      const filteredComments = allComments.map(obj => (obj.id === comment.id ? { ...obj, comment: commentText } : obj));
      this.setState({ allComments: filteredComments, comment: '' });
    } catch (e) {
      console.log('Error', e);
    }
  }

  toggleDelete = (comment) => {
    const { deletePopover } = this.state;
    this.setState({ deletePopover: !deletePopover, commentToDelete: comment });
  }

  deleteComment = async (type) => {
    const { apis, blogId } = this.props;
    const { commentToDelete, allComments } = this.state;
    if (type === 'confirm') {
      await apis.deleteBlogComment({ id: commentToDelete.id, broadCastId: `Blog-${blogId}` });
      const filteredComments = allComments.filter(obj => obj.id !== commentToDelete.id);
      this.setState({ deletePopover: false, commentToDelete: {}, allComments: filteredComments });
      return;
    }
    this.setState({ deletePopover: false, commentToDelete: {} });
  }

  likeBlog = async () => {
    const { liked, allLikes } = this.state;
    const { apis, account, blogId } = this.props;
    console.info("liked", liked, allLikes)
    if (liked) {
      if (liked.likeType === 'like') {
        await apis.updateBlogLike([{ likeType: 'unlike', broadCastId: `Blog-${blogId}` }, { id: liked.id }]);
        this.setState({ allLikes: allLikes - 1, liked: { ...liked, likeType: 'unlike' } });
      } else {
        await apis.updateBlogLike([{ likeType: 'like', broadCastId: `Blog-${blogId}` }, { id: liked.id }]);
        this.setState({ allLikes: allLikes + 1, liked: { ...liked, likeType: 'like' } });
      }
    } else {
      const data = { blogId, userId: account.user.id, timeStamp: Date.now(), likeType: 'like' };
      const res = await apis.addBlogLike({ ...data, broadCastId: `Blog-${blogId}` });
      this.setState({ liked: { id: res, likeType: 'like' }, allLikes: allLikes + 1 });
    }
  }

  render() {
    const { comment, liked, allComments, allLikes, deletePopover } = this.state;
    const { account } = this.props;
    const isLiked = (liked && liked.likeType === 'like') ? true : false;
    const image = (account.user && account.user.userDetails.image) ? `${ENDPOINT}/assets/user/${10000000 + parseInt(account.user.id, 10)}/profile/${account.user.userDetails.image}` : '/assets//graphics/user.svg';
    return (
      <div className="response">
        <div className="left" />
        <div className="comment-section">
          <div className="top-label">
            {account.user && <h1>Leave a response</h1>}
            <div className="reaction-section">
              {account.user ? (
                  <button onClick={this.likeBlog} style={{ cursor: 'pointer' }} className='thumbs-up-btn'>
                    <BiLike color={isLiked ? "#175fc7" : "black"} />
                  </button>
              ) : <button className='thumbs-up-btn'><BiLike color="black" /></button>}
              <span>
                {` ${allLikes} Likes`}
              </span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BiComment className="comment-icon" />
                <span>{allComments.length} comments</span>
              </div>
            </div>
          </div>
          {account.user && (
            <div className="comment-area">
              <div className="profile-icon"><RoundPicture imgUrl={image} /></div>
              <FormTextArea
                className="pc-text-area"
                placeholder="Write your thoughts on this..."
                onChange={this.setComment}
                value={comment}
                resizable
              />
            </div>

          )}
          {account.user && (
            <div className="cmt-btn-wrapper">
              <div className='post-btn'>
                <Button onClick={this.submitComment} type="button" buttonStyle="btn--primary--solid" buttonSize="btn--medium" title="Post" />
              </div>
            </div>
          )}
          <div className="responses">
            <div className="res-label">
              <h3><span style={{ color: 'black', marginRight: '1px' }}></span>Responses</h3>
            </div>
            {allComments.map(obj => <Comment deleteComment={this.toggleDelete} saveComment={this.saveEditedComment} user={obj.user} account={account} comment={obj} key={`com-${obj.id}`} />)}
            <DeletePopOver isOpen={deletePopover} name="Comment" action={this.deleteComment} />
          </div>
        </div>
        <div className="right" />
      </div>
    );
  }
}

CommentContainer.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  blogId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired,
  likes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CommentContainer;
