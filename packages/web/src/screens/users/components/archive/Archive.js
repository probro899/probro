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
    const { database } = this.props;
    return (
      <div>
        <Navbar />
        <div className="archive">
          <div className="ar-top">
            <span>BASED ON YOUR READING HISTORY</span>
          </div>
          <div className="ar-content">
            <div className="ar-left">
              {
                database.Blog.allIds.map((obj) => {
                  const usr = database.Blog.byId[obj].userId;
                  return (
                    <div className="ar-left-i">
                      <div className="ar-i-detail">
                        <Link to={`/archive/${obj}/`} className="ar-i-title">
                          {database.Blog.byId[obj].title}
                        </Link>
                        <p>
                          <Link to={`/user/${usr}/`}>
                            {
                              `${database.User.byId[usr].firstName} ${database.User.byId[usr].middleName ? `${database.User.byId[usr].middleName} ` : ''}${database.User.byId[usr].lastName}`
                            }
                          </Link>
                          <br />
                          <small>
                            {new Date(database.Blog.byId[obj].timeStamp).toDateString()}
                          </small>
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
                  );
                })
              }
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Archive);
