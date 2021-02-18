/* eslint-disable no-console */
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiCurrentLocation } from "react-icons/bi";
import * as actions from '../../../../actions';
import Navbar from '../navbar';
import Footer from '../../../../common/footer';
import Connections from './connections';
import client from '../../../../socket';
import { ENDPOINT } from '../../../../config';
import { Spinner } from '../../../../common';
import RoundPicture from '../../../../components/RoundPicture';
import getName from '../../../../common/utility-functions/getName';
import { Button } from '../../../../common/utility-functions/Button/Button';
import BlogSection from './blogSection';
import { GET_USER } from '../../../../queries';
import clientQuery from '../../../../clientConfig';
import { VerifiedBadge } from '../../../../common/VerifiedBadge';

class PublicProfile extends React.Component {
  constructor(props) {
    super(props);
    const { updateNav } = this.props;
    updateNav({ schema: 'mainNav', data: { name: '' } });
    this.state = {
      apis: null,
      loading: true,
      data: {},
    };
  }

  async componentDidMount() {
    const { match, account, updateNav } = this.props;
    try {
      if (account.user) {
        const apis = await client.scope('Mentee');
        this.setState({ apis })
      }
      const { data, loading, error } = await clientQuery.query({ query: GET_USER, variables: { userSlug: match.params.userId } });
      if (data) {
        this.setState({
          data: data.getUser,
          loading: false,
        });
        updateNav({ schema: 'page', data: { title: getName(data.getUser) } });
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  async componentWillReceiveProps(nextProps, nextState) {
    const { match, updateNav } = this.props;
    const { apis, isLogin } = this.state;
    if (nextProps.match.params.userId !== match.params.userId) {
      this.setState({
        loading: true,
      });
      try {
        const { data, loading, error } = await clientQuery.query({ query: GET_USER, variables: { userSlug: match.params.userId } });
        if (data) {
          this.setState({
            data: data.getUser,
            loading: false,
          });
          updateNav({ schema: 'page', data: { title: getName(data.getUser) } });
        }
      } catch (e) {
        console.log('Error', e);
      }
    }

    if (nextProps.account.user && !apis) {
      const apis = await client.scope('Mentee');
      this.setState({ apis })
    }
  }

  componentWillUnmount() {
    const { updateNav } = this.props;
    updateNav({ schema: 'page', data: { title: 'Proper Class' } });
  }

  render() {
    const {
      account,
      database, updateWebRtc, addDatabaseSchema,
      updateDatabaseSchema,
      webRtc,
    } = this.props;
    const { loading, data, apis } = this.state;
    if (loading) return <Spinner />;
    const userDetails = data.userDetail || {};
    const { userEducation, userWorkExperience } = data;
    const imgUrl = userDetails.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(data.id, 10)}/profile/${userDetails.coverImage}` : '/assets/graphics/default-cover.jpg';
    const editCoverUrl = userDetails.coverEdit && `${ENDPOINT}/assets/user/${10000000 + parseInt(data.id, 10)}/profile/${userDetails.coverEdit}`;
    return (
      <>
        <Navbar />
        <div className="public-profile">
          <div className="main-rt-section">
            <div className="cover-pic">
              {
                editCoverUrl ? <img alt="cover profile of the user" src={editCoverUrl} />
                  : (
                    <img alt="cover profile of the user" src={imgUrl} />
                  )
              }
            </div>

            <div className="adv-body">
              <div className="top-section-wrapper">
                <div className="profile-body">
                  <div className="profilePic">
                    <RoundPicture imgUrl={userDetails.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(data.id, 10)}/profile/${userDetails.image}` : '/assets/graphics/user.svg'} />
                  </div>

                  <div className="connect-btns">
                    {account.user && account.user.id !== data.id
                      && (
                        <Connections
                          apis={apis}
                          data={data}
                          webRtc={webRtc}
                          updateWebRtc={updateWebRtc}
                          addDatabaseSchema={addDatabaseSchema}
                          updateDatabaseSchema={updateDatabaseSchema}
                          database={database}
                          details={data}
                          moreDetails={userDetails}
                          account={account}
                        />
                      )
                    }
                    {!account.user
                      && (
                        <div className="con">
                          <Link to="/login">
                            <Button
                              type="button"
                              buttonSize="btn--medium"
                              buttonStyle="btn--primary--outline"
                              title="Connect"
                            />
                          </Link>
                        </div>
                      )}
                  </div>
                </div>
                <div className="top-details">
                  <div className="desc">
                    <div className="name">{getName(data)} <VerifiedBadge /></div>
                    <div className="title">
                      <p>{userDetails.headLine}</p>
                    </div>
                    <div className="location">
                      <BiCurrentLocation size={20} />
                      <span className="country">
                        {' '}
                        {userDetails.address ? userDetails.address : 'Kathmandu, Nepal'}
                      </span>
                    </div>
                    <div className="bio">
                      {userDetails.bio ? <p>{userDetails.bio}</p> : <p style={{ color: '#696969' }}>No bio added</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-body">

                <div className="education">
                  <h2 className="p-top">
                    Education
                  </h2>
                  <div className="p-edu-list">
                    {userEducation.length !== 0 ? (
                      <div className="p-edu-list">
                        {
                          userEducation.map(obj => (
                            <div className="p-edu-list-i" key={obj.id}>
                              <img src="/assets/graphics/university.svg" alt="school icon" />
                              <div className="edu-details">
                                <span className="p-name-i">{obj.degree}</span>
                                <br />
                                <span className="address">{obj.address}</span>
                                <br />
                                <span className="p-timeline">{`${moment(obj.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${moment(obj.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY")}`}</span>
                                <br />
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                      : <div><span style={{ color: '#696969' }}>No School Added</span></div>
                    }
                  </div>
                </div>
                <div className="experience">
                  <h2 className="p-top">
                    Experience
                  </h2>
                  <div className="p-exp-list">
                    {userWorkExperience.length !== 0 ? (
                      <div className="p-edu-list">
                        {
                          userWorkExperience.map(obj => (
                            <div className="p-exp-list-i" key={obj.id}>
                              <img src="/assets/graphics/office.svg" alt="school icon" />
                              <div className="exp-details">
                                <span className="p-title-i">{obj.title}</span>
                                <br />
                                <span className="p-company-i">{obj.company}</span>
                                <br />
                                <span className="p-timeline">{`${moment(obj.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${obj.endTime ? moment(obj.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY") : 'Currently working'}`}</span>
                                <br />
                                <span>{obj.summary}</span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ) : <div><span style={{ color: '#696969' }}>No experience added</span></div>
                    }
                  </div>
                </div>
                <div className="skills">
                  <h2 className="p-top">
                    Skills
                  </h2>
                  <div className="skills-container">
                    {
                      data.userSkill.length === 0 ? 'No Skills Added' : JSON.parse(data.userSkill[0].skill).map((skill, idx) => <span key={idx}>{skill}</span>)
                    }
                  </div>
                </div>
                {/* <Activities /> */}
              </div>
            </div>
          </div>
          <div className="main-lt-section">
            <div className="mentor-blogs-wrapper">
              <BlogSection data={data} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

PublicProfile.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(PublicProfile);
