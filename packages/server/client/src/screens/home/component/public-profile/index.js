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
import { GET_USER } from '../../../../queries';
import clientQuery from '../../../../clientConfig';
import { VerifiedBadge } from '../../../../common/VerifiedBadge';
import ReadMoreReadLess from '../../../../common/ReadMoreReadLess';
import PopularOnPc from '../../../../common/PopularOnPc';
import ReactHelmet from '../../../../common/react-helmet';

class PublicProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apis: null, loading: true, data: {} };
  }

  componentDidMount() {
    const { account } = this.props;
    this.loadData();
    if (account.user) {
      this.loadApis();
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { match, account } = this.props;
    const { apis } = this.state;
    if (nextProps.match.params.userId !== match.params.userId) {
      this.loadData();
    }
    if (nextProps.account.user !== account.user) {
      this.loadData();
    }
    if (nextProps.account.user && !apis) this.loadApis();
  }

  loadApis = async () => {
    try {
      const apis = await client.scope('Mentee');
      this.setState({ apis });
    } catch (e) {
      console.info('server error');
    }
  }

  loadData = async () => {
    const { match } = this.props;
    this.setState({ loading: true });
    try {
      const { data, loading, error } = await clientQuery.query({ query: GET_USER, variables: { userSlug: match.params.userId } });
      if (data) {
        console.info('get user', data);
        const { firstName, lastName, middleName, slug, id } = data.getUser;
        const userObj = { firstName, lastName, middleName, slug, id };
        this.setState({ data: { ...data.getUser, blogs: data.getUser.blogs.map(o => ({ ...o, user: userObj })) }, loading: false });
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  render() {
    const { account, database, updateWebRtc, addDatabaseSchema, updateDatabaseSchema, webRtc, match } = this.props;
    const { loading, data, apis } = this.state;
    if (loading) return <Spinner />;
    const userDetails = data.userDetail || {};
    const { userEducation, userWorkExperience } = data;
    const imgUrl = userDetails.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(data.id, 10)}/profile/${userDetails.coverImage}` : '/assets/graphics/default-cover.jpg';
    const editCoverUrl = userDetails.coverEdit && `${ENDPOINT}/assets/user/${10000000 + parseInt(data.id, 10)}/profile/${userDetails.coverEdit}`;
    return (
      <>
        <ReactHelmet match={match} headerData={{ firstName: data.firstName, lastName: data.lastName, middleName: data.middleName, type: data.type }} />
        <Navbar />
        <div className="public-profile">
          <div className="main-rt-section">
            <div className="cover-pic">
              {editCoverUrl ? <img alt="cover profile" src={editCoverUrl} />
                : <img alt="cover profile" src={imgUrl} />
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
                    {!account.user && (
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
                    <div className="name">{getName(data)} {data.type === 'verified' && <VerifiedBadge />}</div>
                    <div className="title">
                      <p>{userDetails.headLine}</p>
                    </div>
                    <div className="location">
                      <BiCurrentLocation size={20} />
                      <span className="country">
                        {' '}{userDetails.address ? userDetails.address : '---'}
                      </span>
                    </div>
                    <div className="bio">
                      {userDetails.bio ? <p><ReadMoreReadLess text={userDetails.bio} /></p> : <p style={{ color: '#696969' }}>No bio added</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-body">
                <div className="education">
                  <div className="pc-content-header">
                    <h2 className="pc-content-header__title">
                      Education
                    </h2>
                  </div>
                  <div className="p-edu-list">
                    {userEducation.length !== 0 ? (
                      <div className="p-edu-list">
                        {
                          userEducation.map(obj => (
                            <div className="pc-content-list" key={`ed-${obj.id}`}>
                              <img src="/assets/graphics/university.svg" alt="school icon" className="pc-content-list__image" />
                              <div className="pc-list-details">
                                <h3 className="pc-list-details__title">{obj.degree}</h3>
                                <p className="pc-list-details__company">{obj.address}</p>
                                <p className="pc-list-details__timeline">{`${moment(obj.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${moment(obj.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY")}`}</p>
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
                  <div className="pc-content-header">
                    <h2 className="pc-content-header__title">
                      Experience
                    </h2>
                  </div>
                  <div className="p-exp-list">
                    {userWorkExperience.length !== 0 ? (
                      <div className="p-edu-list">
                        {
                          userWorkExperience.map(obj => (
                            <div className="pc-content-list" key={`exp-${obj.id}`}>
                              <img src="/assets/graphics/office.svg" alt="school icon" className="pc-content-list__image" />
                              <div className="pc-list-details">
                                <h3 className="pc-list-details__title">{obj.title}</h3>
                                <p className="pc-list-details__company">{obj.company}</p>
                                <p className="pc-list-details__timeline">{`${moment(obj.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${obj.currentWorking ? 'Currently working' : moment(obj.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY")}`}</p>
                                <p className="pc-list-details__description"><ReadMoreReadLess text={obj.summary} /></p>
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
                  <h2 className="p-top">Skills</h2>
                  <div className="skills-container">
                    {data.userSkill.length === 0 ? 'No Skills Added' : JSON.parse(data.userSkill[0].skill).map((skill, idx) => <span key={`sk-${idx}`}>{skill}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PopularOnPc
            blogs={data.blogs}
            mentors={data.popularMentors}
            courses={data.courses || []}
            user={data}
          />
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
