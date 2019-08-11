import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import { PopoverForm } from '../../../../components';
import { NameSchema, CarrierSchema, GenderSchema } from './structure';

class BasicSettings extends React.Component {
  state={
    namePopover: false,
    genderPopover: false,
    careerPopover: false,
  };

  editName = async (data) => {
    const { apis, account } = this.props;
    if (data.firstName.replace(/\s/g, '').length < 1) {
      return { error: 'Please enter first name' };
    }
    if (data.lastName.replace(/\s/g, '').length < 1) {
      return { error: 'Please enter last name' };
    }
    await apis.updateUserDetails([
      { firstName: data.firstName, middleName: data.middleName, lastName: data.lastName },
      { id: account.user.id },
    ]);
    return { response: 200, message: 'Changed successfully' };
  }

  editGender = async (data) => {
    const { apis, account } = this.props;
    if (data.gender.replace(/\s/g, '').length < 1) {
      return { error: 'Select your gender' };
    }
    await apis.updateUserDetails([
      { gender: data.gender },
      { id: account.user.id },
    ]);
    return { response: 200, message: 'Changed successfully' };
  }

  editInterest = async (data) => {
    const { apis, account } = this.props;
    await apis.updateUserDetails([
      { field: data.interest },
      { id: account.user.id },
    ]);
    return { response: 200, message: 'Changed successfully' };
  }

  togglePopover = (type) => {
    const { namePopover, genderPopover, careerPopover } = this.state;
    const { account } = this.props;
    switch (type) {
      case 'name':
        NameSchema.map((obj) => {
          if (obj.id === 'firstName') {
            obj.val = account.user.firstName;
          }
          if (obj.id === 'lastName') {
            obj.val = account.user.lastName;
          }
          if (obj.id === 'middleName') {
            obj.val = account.user.middleName;
          }
        });
        this.setState({
          namePopover: !namePopover,
        });
        break;
      case 'gender':
        this.setState({
          genderPopover: !genderPopover,
        });
        break;
      case 'career':
        this.setState({
          careerPopover: !careerPopover,
        });
        break;
      default:
    }
  }

  render() {
    const { account } = this.props;
    const { namePopover, genderPopover, careerPopover } = this.state;
    return (
      <div className="container-settings">
        <PopoverForm
          isOpen={namePopover}
          structure={NameSchema}
          callback={this.editName}
          onClose={() => this.togglePopover('name')}
        />
        <PopoverForm
          isOpen={genderPopover}
          structure={GenderSchema}
          callback={this.editGender}
          onClose={() => this.togglePopover('gender')}
        />
        <PopoverForm
          isOpen={careerPopover}
          structure={CarrierSchema}
          callback={this.editInterest}
          onClose={() => this.togglePopover('career')}
        />
        <p className="basic">
          <span className="label">Full Name</span>
          {account.user
            && (
              <span className="value">
                {account.user.middleName ? `${account.user.firstName} ${account.user.middleName} ${account.user.lastName}` : `${account.user.firstName} ${account.user.lastName}`}
              </span>
            )
          }
          <Icon
            icon="edit"
            color="rgba(167, 182, 194, 1)"
            className="edit-icon"
            onClick={() => this.togglePopover('name')}
          />
        </p>
        <p className="basic">
          <span className="label">Gender</span>
          <span className="value">Male</span>
          <Icon
            icon="edit"
            color="rgba(167, 182, 194, 1)"
            className="edit-icon"
            onClick={() => this.togglePopover('gender')}
          />
        </p>
        <div className="basic">
          <span className="label">Carrier Interests</span>
          <Icon
            icon="edit"
            color="rgba(167, 182, 194, 1)"
            className="edit-icon"
            onClick={() => this.togglePopover('career')}
          />
          <ul>
            <li>Leadership</li>
            <li>Enterpreneur</li>
            <li>Engineering</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(BasicSettings);
