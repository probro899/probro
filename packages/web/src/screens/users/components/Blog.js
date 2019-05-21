import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';

class Blogs extends Component {
  state = {
    createBlog: false,
  };

  render() {
    const { createBlog } = this.state;
    const id = sessionStorage.getItem('SESSION_ID');
    return (
      <div className="blogs">
        { createBlog && <Redirect push to={`/write-blog/${id}/me`} /> }
        <h1>Blogs</h1>
        <Button
          text="Create Blog"
          intent={Intent.PRIMARY}
          onClick={() => this.setState({ createBlog: !createBlog })}
        />
      </div>
    );
  }
}

export default Blogs;
