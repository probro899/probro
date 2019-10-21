import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../../actions';
import Navbar from '../../home/component/navbar';
import Footer from '../../../common/footer';
import { ENDPOINT } from '../../../config';
import { Spinner } from '../../../common';

class Archive extends React.Component {
  state = {
    loading: true,
    data: [],
  };

  async componentDidMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'archive' },
    });
    try {
      const res = await axios.get(`${ENDPOINT}/web/get-index`);
      console.log('res', res);
      this.setState({
        data: res.data.archive,
        loading: false,
      });
    } catch (e) {
      console.log('Eror: ', e);
    }
  }

  render() {
    const { loading, data } = this.state;
    console.log('archive', data);
    return loading ? <Spinner /> : (
      <div>
        <Navbar />
        <div className="archive">
          <div className="ar-top">
            <span>BASED ON YOUR READING HISTORY</span>
          </div>
          <div className="ar-content">
            <div className="ar-left">
              {
                data.map((obj, index) => {
                  const description = obj.blog.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substring(0, 300);
                  let user;
                  obj.userDetails.map((u) => {
                    if (u.user.id === obj.blog.userId) {
                      user = u;
                    }
                  });
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
                        <Link to={`/archive/${obj.blog.id}/${obj.blog.userId}`} className="ar-i-title">
                          {obj.blog.title}
                        </Link>
                        <p>
                          <span>Author-</span>
                          <Link to={`/user/${user.user.id}/`}>
                            {
                              ` ${user.user.firstName} ${user.user.middleName ? `${user.user.middleName} ` : ''}${user.user.lastName}`
                            }
                          </Link>
                          <br />
                          <small className="pc-date">
                            {new Date(obj.blog.timeStamp).toDateString()}
                          </small>
                        </p>
                        <div className="pc-blog-desc">
                          {`${description} ...`}
                        </div>
                        <div className="ar-i-counts">
                          <p className="label">
                            <span className="count">{obj.blogComment.length}</span>
                            Comments
                          </p>
                          <p className="label">
                            <span className="count">{obj.blogLike.length}</span>
                            Likes
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
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Archive);
