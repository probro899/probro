/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Icon, Dialog, Button } from '@blueprintjs/core';
import { Taginput } from '../../../common';

const PopoverContent = (props) => {
  const { data, value, onChange, callback } = props;
  return (
    <div
      style={{
        padding: '10px 10px 0 10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 600,
          paddingBottom: 10,
        }}
      >
        <span>Carrier Interests</span>
      </div>
      <Taginput data={data} onChange={onChange} value={value} />
      <Button onClick={callback} fill intent="success" large text="Save" />
    </div>
  );
};

class CarrierInterestSetting extends React.Component {
  constructor(props) {
    super(props);
    const { userDetail } = this.props;
    this.state = { open: false, value: userDetail.field ? JSON.parse(userDetail.field) : [] };
  }

  togglePopover = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  onChangeInterest = (id, value) => {
    this.setState({
      value,
    });
  }

  editInterest = async () => {
    const { value } = this.state;
    const { apis, userDetail, updateDatabaseSchema } = this.props;
    await apis.updateUserDetails(
      {
        field: JSON.stringify(value),
        userId: userDetail.userId,
      }
    );
    updateDatabaseSchema('UserDetail', {
      id: userDetail.id,
      field: JSON.stringify(value),
    });
    return { response: 200, message: 'Changed successfully' };
  }

  getInterests = () => {
    const { userDetail } = this.props;
    if (!userDetail.field || JSON.parse(userDetail.field).length === 0) {
      return <div>---</div>;
    }
    return (
      <div className="skills-container">
        {
          JSON.parse(userDetail.field).map((obj, idx) => (
            <span key={idx}>{obj}</span>
          ))
        }
      </div>
    );
  }

  render() {
    const { open, value } = this.state;
    const data = { id: 'interest', name: 'Carrier Interests', placeholder: 'Type and press enter' };
    return (
      <div className="basic">
        <div className="label">Carrier Interests</div>
        <Dialog
          onClose={this.togglePopover}
          isOpen={open}
        >
          <PopoverContent
            onChange={this.onChangeInterest}
            value={value}
            data={data}
            callback={this.editInterest}
          />
        </Dialog>
        <div className="value">
          {this.getInterests()}
          <Icon
            icon="edit"
            color="rgba(167, 182, 194, 1)"
            className="edit-icon"
            onClick={() => this.togglePopover('career')}
          />
        </div>
      </div>
    );
  }
}

export default CarrierInterestSetting;
