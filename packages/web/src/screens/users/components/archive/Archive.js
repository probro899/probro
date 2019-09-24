import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../../../actions';
import Navbar from '../../../home/component/navbar';
import Footer from '../../../../common/footer';
import { ENDPOINT } from '../../../../config';
// import { timeStampSorting } from '../../utility-functions';

class Archive extends React.Component {
  state = {};

  async componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'archive' },
    });
    try {
      const res = await axios.get(`${ENDPOINT}/web/get-index`);
      console.log(res);
    } catch (e) {
      console.log('Eror: ', e);
    }
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
                  const description = obj.content.replace(/<[^>]+>/g, '').replace('&nbsp;', ' ').substring(0, 300);
                  return (
                    <div className="ar-left-i" key={index}>
                      <div className="ar-i-img">
                        <img
                          alt="test here"
                          height="150px"
                          src="http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/03/good-morning-pics-1.jpg"
                        />
                      </div>
                      <div className="ar-i-detail">
                        <Link to={`/archive/${obj.id}/`} className="ar-i-title">
                          {obj.title}
                        </Link>
                        <p>
                          <span>Author-</span>
                          <Link to={`/user/${usr}/`}>
                            {
                              ` ${database.User.byId[usr].firstName} ${database.User.byId[usr].middleName ? `${database.User.byId[usr].middleName} ` : ''}${database.User.byId[usr].lastName}`
                            }
                          </Link>
                          <br />
                          <small className="pc-date">
                            {new Date(obj.timeStamp).toDateString()}
                          </small>
                        </p>
                        <div className="pc-blog-desc">
                          {description}
                        </div>
                        <div className="ar-i-counts">
                          <p className="label">
                            Comments
                            <span className="count">{counts.comments}</span>
                          </p>
                          <p className="label">
                            Likes
                            <span className="count">{counts.likes}</span>
                          </p>
                        </div>
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
