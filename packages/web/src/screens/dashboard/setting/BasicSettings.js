import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import { PopoverForm } from '../../../components';
import { NameSchema, CarrierSchema, GenderSchema } from './structure';

class BasicSettings extends React.Component {
  state={
    namePopover: false,
    genderPopover: false,
    careerPopover: false,
  };

  editName = async (data) => {
    const { apis, account } = this.props;
    await apis.updateUser([
      { ...data },
      { id: account.user.id },
    ]);
    return { response: 200, message: 'Changed successfully' };
  }

  editGender = async (data) => {
    const { apis, account } = this.props;
    await apis.updateUserDetails(
      { ...data, userId: account.user.id }
    );
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
      case 'career':
        this.setState({
          careerPopover: !careerPopover,
        });
        break;
      default:
    }
  }

  render() {
    const { account, database } = this.props;
    const { namePopover, genderPopover, careerPopover } = this.state;
    let gen = '---';
    Object.values(database.UserDetail.byId).map((obj) => {
      if (obj.userId === account.user.id) {
        gen = obj.gender;
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
          <span className="value">{gen}</span>
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
