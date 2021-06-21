/* eslint-disable react/button-has-type */
import React from 'react';

export default class Package extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addTaskParticipant = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addTaskParticipant({
      taskId: 214,
      userId: uId,
      participantId: 5,
      broadCastId: 'Board-1',
    });
    console.log('Add Organization res', res);
  }

  deleteTaskParticipant = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.deleteTaskParticipant({
      id: 1,
      taskId: 214,
      broadCastId: 'Board-1',
    });
    console.log('delete participant res', res);
  }

  addBlogBookmark = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addBlogBookmark({
      userId: uId,
      blogId: 6,
    });
    console.log('Add Organization res', res);
  }

  getBlogBookmarks = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.getBlogBookmarks();
    console.log('getBookmarks res', res);
  }


  deleteBlogBookmark = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.deleteBlogBookmark({ id: 1 });
    console.log('del bookmark res', res);
  }


  render() {
    // console.log('Apis in api test', this.state);
    return (
      <div>
        <h4>Task Participant Test</h4>
        <button onClick={this.addTaskParticipant}> addTaskParticipant </button>
        <button onClick={this.deleteTaskParticipant}> deleteTaskParticipant </button>
        <h1>Blog bookmark</h1>
        <button onClick={this.addBlogBookmark}> addBlogBookmark </button>
        <button onClick={this.getBlogBookmarks}>getBlogBookmarks</button>
        <button onClick={this.deleteBlogBookmark}>deleteBlogBookmark</button>
      </div>
    );
  }
}
