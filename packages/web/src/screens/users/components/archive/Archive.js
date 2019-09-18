import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions from '../../../../actions';
import Navbar from '../../../home/component/navbar';
import Footer from '../../../../common/footer';
import { timeStampSorting } from '../../utility-functions';

class Archive extends React.Component {
  state = {};

  componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'archive' },
    });
  }

  calculateLikeandComment = (id) => {
    const { database } = this.props;
    const likes = Object.values(database.BlogLike.byId).filter((obj) => {
      return obj.blogId === id;
    }).reduce(tot => tot + 1, 0);
    const comments = Object.values(database.BlogComment.byId).filter((obj) => {
      return obj.blogId === id;
    }).reduce(tot => tot + 1, 0);
    return { likes, comments };
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
                Object.values(database.Blog.byId).map((obj, index) => {
                  const usr = obj.userId;
                  const counts = this.calculateLikeandComment(obj.id);
                  return (
                    <div className="ar-left-i" key={index}>
                      <div className="ar-i-detail">
                        <Link to={`/archive/${obj.id}/`} className="ar-i-title">
                          {obj.title}
                        </Link>
                        <p>
                          <Link to={`/user/${usr}/`}>
                            {
                              `${database.User.byId[usr].firstName} ${database.User.byId[usr].middleName ? `${database.User.byId[usr].middleName} ` : ''}${database.User.byId[usr].lastName}`
                            }
                          </Link>
                          <br />
                          <small>
                            {new Date(obj.timeStamp).toDateString()}
                          </small>
                        </p>
                        <div className="ar-i-counts">
                          <p>
                            Comments
                            <span>{counts.comments}</span>
                          </p>
                          <p>
                            Likes
                            <span>{counts.likes}</span>
                          </p>
                        </div>
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
        <Footer />
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
