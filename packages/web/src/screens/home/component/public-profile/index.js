import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import axios from 'axios';
import * as actions from '../../../../actions';
import Navbar from '../navbar';
import Footer from '../../../../common/footer';
import Connections from './connections';
import client from '../../../../socket';
import { ENDPOINT } from '../../../../config';
import { Spinner } from '../../../../common';
import RoundPicture from '../../../../components/RoundPicture';

const file = require('../../../../assets/icons/512h/uploadicon512.png');
const school = require('../../../../assets/icons/64w/school64.png');
const office = require('../../../../assets/icons/64w/office64.png');
const defaultCover = require('../../../../assets/default-cover.png');

class PublicProfile extends React.Component {
  constructor(props) {
    super(props);
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: '' },
    });
    this.state = {
      apis: {},
      loading: true,
      data: {},
    };
  }

  async componentDidMount() {
    const { match, account } = this.props;
    let apis = {};
    try {
      if (account.user) {
        apis = await client.scope('Mentee');
      }
      const res = await axios.get(`${ENDPOINT}/web/get-user?userId=${match.params.userId}`);
      // console.log('profile detail', res);
      this.setState({
        data: res.data,
        apis,
        loading: false,
      });
    } catch (e) {
      console.log('Error', e);
    }
  }

  render() {
    const { account, database, updateWebRtc } = this.props;
    const { loading, data } = this.state;
    // console.log('accout data', data);
    if (loading) {
      return <Spinner />;
    }
    const userDetails = data.userDetail;
    const { user } = data;
    const { apis } = this.state;
    const { userEducation } = data;
    const { userWorkExperience } = data;
    const imgUrl = data.userDetail.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(data.user.id, 10)}/profile/${data.userDetail.coverImage}` : defaultCover;
    const editCoverUrl = data.userDetail.coverEdit && `${ENDPOINT}/user/${10000000 + parseInt(data.user.id, 10)}/profile/${data.userDetail.coverEdit}`;
    return (
      <div>
        <Navbar />
        <div className="public-profile">
          <div className="cover-pic">
            {
              editCoverUrl ? <img alt="cover profile of the user" src={editCoverUrl} />
                : (
                  <img alt="cover profile of the user" src={imgUrl} />
                )
            }
          </div>
          <div className="profilePic">
            <RoundPicture imgUrl={userDetails.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetails.image}` : file} />
          </div>
          <div className="top-details">
            <div className="desc">
              <span className="name">
                {user.middleName ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.lastName}`}
              </span>
              <br />
              <Icon icon="locate" />
              <span className="country">
                {' '}
                {userDetails.address ? userDetails.address : '---'}
              </span>
            </div>
            {account.user && (
              <div className="connect-btns">
                { account.user.id !== user.id && (account.user.userDetails.type !== 'mentee' || userDetails.type !== 'mentee')
                  && (
                    <Connections
                      apis={apis}
                      updateWebRtc={updateWebRtc}
                      database={database}
                      details={user}
                      moreDetails={userDetails}
                      account={account}
                    />
                  )
                }
              </div>
            )}
          </div>
          <div className="bio">
            {userDetails.bio ? <p>{userDetails.bio}</p> : <p style={{ color: '#696969' }}>No bio added</p>}
          </div>
          <div className="education">
            <p className="p-top">
              <span>Education</span>
            </p>
            <div className="p-edu-list">
              {userEducation.length !== 0 ? (
                <div className="p-edu-list">
                  {
                    userEducation.map(obj => (
                      <div className="p-edu-list-i">
                        <img src={school} alt="school icon" />
                        <p>
                          <span className="p-name-i">{obj.degree}</span>
                          <br />
                          <span>{obj.address}</span>
                          <br />
                          <span className="p-timeline">{`${obj.startTime} - ${obj.endTime}`}</span>
                          <br />
                        </p>
                      </div>
                    ))
                  }
                </div>
              )
                : (
                  <div>
                    <span style={{ color: '#696969' }}>No School Added</span>
                  </div>
                )
              }
            </div>
          </div>
          <div className="experience">
            <p className="p-top">
              <span>Experience</span>
            </p>
            <div className="p-exp-list">
              {userWorkExperience.length !== 0 ? (
                <div className="p-edu-list">
                  {
                    userWorkExperience.map(obj => (
                      <div className="p-exp-list-i">
                        <img src={office} alt="school icon" />
                        <p>
                          <span className="p-title-i">{obj.title}</span>
                          <br />
                          <span className="p-company-i">{obj.company}</span>
                          <br />
                          <span className="p-timeline">{`${obj.startTime} - ${obj.endTime}`}</span>
                          <br />
                          <span>{obj.summary}</span>
                        </p>
                      </div>))
                  }
                </div>
              )
                : (
                  <div>
                    <span style={{ color: '#696969' }}>No experience added</span>
                  </div>
                )
              }
            </div>
          </div>
          <div className="skills">
            <p className="p-top">
              <span>Skills</span>
            </p>
            <div className="skills-container">
              {
                data.userSkill.length === 0 ? 'No Skills Added' : JSON.parse(data.userSkill[0].skill).map((skill, idx) => <span key={idx}>{skill}</span>)
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

PublicProfile.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(PublicProfile);
