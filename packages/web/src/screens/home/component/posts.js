import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card } from '@blueprintjs/core';

const Posts = (props) => {
  const { post } = props;
  return (
    <Card className="post-box">
      <div className="post-header">
        <p>{ post.title }</p>
      </div>
      <div className="desc-image">
        <div className="post-desc">
          <p>{ post.description }</p>
        </div>
        <div className="post-image">
          <img src={post.image} alt={post.id} />
        </div>
      </div>
    </Card>
  );
};
Posts.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/posts')
      .then((response) => {
        this.setState({ posts: response.data });
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="post-container">
        <div className="posts">
          {
            posts.map(post => (
              <Posts key={post.id} post={post} />
            ))
          }
        </div>
      </div>
    );
  }
}
export default Post;
