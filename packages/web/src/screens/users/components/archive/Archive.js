import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import * as actions from '../../../../actions';
import Navbar from '../../../home/component/navbar';

class Archive extends React.Component {
  state = {};

  componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'archive' },
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="archive">
          <div className="ar-top">
            <span>BASED ON YOUR READING HISTORY</span>
          </div>
          <div className="ar-content">
            <div className="ar-left">
              <div className="ar-left-i">
                <div className="ar-i-detail">
                  <span className="ar-i-title">Reading about python programming here.</span>
                  <p className="ar-i-sm-desc">
                    Python is a latest sensation in the world.
                  </p>
                  <p>
                    <Link to="#">Sarman Joshi</Link>
                    <br />
                    <small>2017 july 14</small>
                  </p>
                  <p className="ar-i-btn-group">
                    <Button icon="share" text="share" />
                    <Button icon="thumbs-up" />
                    <Button icon="thumbs-down" />
                  </p>
                </div>
                <div className="ar-i-img">
                  <img
                    alt="test here"
                    height="150px"
                    src="http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/good-morning-pics-1.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="ar-right">
              <p className="ar-right-top">
                Popular on PC
              </p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Archive.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Archive);
