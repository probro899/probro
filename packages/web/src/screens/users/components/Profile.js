import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';

class Profile extends Component {
  state = {}

  componentWillMount() {
    const { mainHandler } = this.props;
    mainHandler('user');
  }

  render() {
    const { main } = this.props;
    const userAttributes = [
      { firstName: 'First Name' },
      { lastName: 'Last Name' },
      { email: 'Email' },
    ];
    return (
      <div className="profile">
        <div className="profilePic">
          <img src="https://i1.wp.com/www.molddrsusa.com/wp-content/uploads/2015/11/profile-empty.png.250x250_q85_crop.jpg?ssl=1" alt="profile of the user" />
        </div>
        <div className="profileDetails">
          {
            userAttributes.map((obj) => {
              return (
                <div className="detailElement" key={Object.keys(obj)[0]}>
                  <span style={{ fontSize: 18, color: 'brown' }}>{Object.values(obj)[0]}</span>
                  <span style={{ fontSize: 17 }}>{main.user[Object.keys(obj)[0]]}</span>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  main: PropTypes.objectOf(PropTypes.any).isRequired,
  mainHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(Profile);
