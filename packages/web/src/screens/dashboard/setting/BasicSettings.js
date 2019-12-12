import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import * as actions from '../../../actions';
import { PopoverForm } from '../../../components';
import { NameSchema, GenderSchema, AddressSchema } from './structure';
import CarrierInterestSetting from './CarrierInterestSetting';

class BasicSettings extends React.Component {
  state={
    namePopover: false,
    genderPopover: false,
    addressPopover: false,
  };

  editName = async (data) => {
    const { apis, account } = this.props;
    await apis.updateUser([
      { ...data },
      { id: account.user.id },
    ]);
    return { response: 200, message: 'Changed successfully' };
  }

  editAddress = async (data) => {
    const { apis, account } = this.props;
    try {
      await apis.updateUserDetails(
        { ...data, userId: account.user.id }
      );
      return { response: 200, message: 'Changed successfully' };
    } catch (e) {
      return { response: 400, error: 'Internal server error' };
    }
  }

  editGender = async (data) => {
    const { apis, account } = this.props;
    try {
      await apis.updateUserDetails(
        { ...data, userId: account.user.id }
      );
      return { response: 200, message: 'Changed successfully' };
    } catch (e) {
      return { response: 400, error: 'Internal server error' };
    }
  }

  togglePopover = (type) => {
    const { namePopover, genderPopover, addressPopover } = this.state;
    const { account, database } = this.props;
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
        GenderSchema.map((obj) => {
          if (obj.id === 'gender') {
            let gen = '';
            Object.values(database.UserDetail.byId).map((obj) => {
              if (obj.userId === account.user.id) {
                gen = obj.gender;
              }
            });
            obj.val = gen;
          }
        });
        this.setState({
          genderPopover: !genderPopover,
        });
        break;
      case 'address':
        AddressSchema.map((obj) => {
          if (obj.id === 'address') {
            let address = '';
            Object.values(database.UserDetail.byId).map((obj) => {
              if (obj.userId === account.user.id) {
                address = obj.address;
              }
            });
            obj.val = address;
          }
        });
        this.setState({
          addressPopover: !addressPopover,
        });
        break;
      default:
    }
  }

  render() {
    const { account, database, updateDatabaseSchema, apis } = this.props;
    const { namePopover, addressPopover, genderPopover } = this.state;
    let gen = '---';
    let address = '---';
    let userDetail = {};
    Object.values(database.UserDetail.byId).map((obj) => {
      if (obj.userId === account.user.id) {
        gen = obj.gender ? obj.gender : '---';
        address = obj.address ? obj.address : '---';
        userDetail = obj;
      }
    });
    return (
      <div className="container-settings">
        <PopoverForm
          isOpen={namePopover}
          structure={NameSchema}
          callback={this.editName}
          onClose={() => this.togglePopover('name')}
        />
        <PopoverForm
          isOpen={addressPopover}
          structure={AddressSchema}
          callback={this.editAddress}
          onClose={() => this.togglePopover('address')}
        />
        <PopoverForm
          isOpen={genderPopover}
          structure={GenderSchema}
          callback={this.editGender}
          onClose={() => this.togglePopover('gender')}
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
          <span className="value">{gen.charAt(0).toUpperCase() + gen.slice(1)}</span>
          <Icon
            icon="edit"
            color="rgba(167, 182, 194, 1)"
            className="edit-icon"
            onClick={() => this.togglePopover('gender')}
          />
        </p>
        <p className="basic">
          <span className="label">Address</span>
          <span className="value">{address}</span>
          <Icon
            icon="edit"
            color="rgba(167, 182, 194, 1)"
            className="edit-icon"
            onClick={() => this.togglePopover('address')}
          />
        </p>
        <CarrierInterestSetting
          updateDatabaseSchema={updateDatabaseSchema}
          userDetail={userDetail}
          apis={apis}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(BasicSettings);
