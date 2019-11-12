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
        <span>Add Skills</span>
      </div>
      <Taginput data={data} onChange={onChange} value={value} />
      <Button onClick={callback} fill intent="primary" large text="Add Skills" />
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

  render() {
    const { open, value } = this.state;
    const { userDetail } = this.props;
    const data = { id: 'interest', name: 'Carrier Interests', placeholder: 'Type and press enter' };
    return (
      <div className="basic">
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
        <span className="label">Carrier Interests</span>
        <Icon
          icon="edit"
          color="rgba(167, 182, 194, 1)"
          className="edit-icon"
          onClick={() => this.togglePopover('career')}
        />
        {!userDetail.field || JSON.parse(userDetail.field).length === 0 ? <ul>---</ul>
          : (
            <ul>
              {
                JSON.parse(userDetail.field).map((obj, idx) => <li key={idx}>{obj}</li>)
              }
            </ul>
          )}
      </div>
    );
  }
}

export default CarrierInterestSetting;
