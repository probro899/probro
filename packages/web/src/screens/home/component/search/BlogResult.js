import React from 'react';
import PropTypes from 'prop-types';
import { SingleArchive } from '../../../blog/archive';

class BlogResult extends React.Component {
  state={};

  render() {
    const { data } = this.props;
    return (
      <div className="result-list blogs">
        <p className="label">
          Popular Blogs
        </p>
        {
          data.map(obj => <SingleArchive obj={obj} key={obj.blog.id} />)
        }
      </div>
    );
  }
}

BlogResult.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BlogResult;
