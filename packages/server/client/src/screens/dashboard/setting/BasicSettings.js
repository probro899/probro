import React from 'react';
import { connect } from 'react-redux';
import countryList from 'react-select-country-list';
import { MdEdit } from 'react-icons/md';
import * as actions from '../../../actions';
import { PopoverForm } from '../../../components';
import getName from '../../../common/utility-functions/getName';
import { NameSchema, GenderSchema, AddressSchema, CountrySchema, HeadlineSchema } from './structure';
import CarrierInterestSetting from './CarrierInterestSetting';
import BasicSettingContainer from './BasicSettingContainer';

class BasicSettings extends React.Component {
  state = {
    popover: {
      schema: null,
      open: false,
      structure: null,
      table: null,
    },
  };

  togglePopover = (schema, structure, table) => {
    const { popover } = this.state;
    if (popover.open) {
      this.setState({ popover: { open: false, structure: null, schema: null, table: null } })
      return;
    }
    this.setState({
      popover: {
        open: true,
        structure: structure,
        schema: schema,
        table: table,
      }
    })
  }

  getPopoverStructure = () => {
    const { popover } = this.state;
    const { User, UserDetail, account } = this.props;
    const user = Object.values(User.byId).find((obj) => {
      return obj.id === account.user.id;
    });
    const userDetail = Object.values(UserDetail.byId).find((obj) => {
      return obj.userId === account.user.id;
    }) || {};
    switch (popover.schema) {
      case 'headline':
        return popover.structure.map((obj) => {
          if (obj.id === 'headline') obj.val = userDetail.headLine;
          return obj;
        });
      case 'gender':
        return popover.structure.map(obj => {
          if (obj.id === 'gender') obj.val = userDetail.gender;
          return obj;
        });
      case 'name':
        return popover.structure.map(obj => {
          if (obj.id === 'firstName') obj.val = user.firstName;
          if (obj.id === 'lastName') obj.val = user.lastName;
          if (obj.id === 'middleName') obj.val = user.middleName;
          return obj;
        });
      case 'country':
        return popover.structure.map((obj) => {
          if (obj.id === 'country') {
            const countries = countryList().getData().map(obj => ({ label: obj.label, value: obj.label }));
            obj.val = userDetail.country;
            obj.options = [...countries];
          }
          return obj;
        });
      case 'address':
        return popover.structure.map(obj => {
          if (obj.id === 'address') obj.val = userDetail.address;
          return obj;
        });
      default:
        return {};
    }
  }

  submitChange = async (data) => {
    const { popover } = this.state;
    const { apis, account } = this.props;
    try {
      if (popover.table === 'User') {
        await apis[`update${popover.table}`]([
          { ...data },
          { id: account.user.id },
        ]);
      } else {
        await apis[`update${popover.table}`](
          { ...data, userId: account.user.id }
        );
      }
      return { response: 200, message: 'Changed successfully' };
    } catch (e) {
      return { response: 400, error: 'Internal server error' };
    }
  }

  render() {
    const { account, User, UserDetail, updateDatabaseSchema, apis } = this.props;
    const { popover } = this.state;
    const user = Object.values(User.byId).find(u => u.id === account.user.id);
    let userDetail = Object.values(UserDetail.byId).find(obj => user.id === obj.userId) || {};
    return (
      <>
        <div className="basic-setting-wrappers">
          <BasicSettingContainer title="Full Name" subtitle="Change your name" />
          <BasicSettingContainer title="Gender" subtitle="Change your gender" />
          <BasicSettingContainer title="Headline" subtitle="Change your headline" />
          <BasicSettingContainer title="Country" subtitle="Change your country" />
          <BasicSettingContainer title="Address" subtitle="Change your address" />
        </div>
        <div className="container-settings">
          <PopoverForm
            isOpen={popover.open}
            structure={this.getPopoverStructure()}
            callback={this.submitChange}
            onClose={() => this.togglePopover(popover.schema)}
          />
          <div className="basic">
            <div className="label">Full Name</div>
            <div className="value">
              {account.user && <span>{getName(user)}</span>}
              <MdEdit
                size={20}
                color="rgba(167, 182, 194, 1)"
                className="edit-icon"
                onClick={() => this.togglePopover('name', NameSchema, 'User')}
              />
            </div>
          </div>
          <div className="basic">
            <div className="label">Gender</div>
            <div className="value">
              <span style={{ textTransform: 'capitalize' }}>{userDetail.gender}</span>
              <MdEdit
                size={20}
                color="rgba(167, 182, 194, 1)"
                className="edit-icon"
                onClick={() => this.togglePopover('gender', GenderSchema, 'UserDetails')}
              />
            </div>
          </div>
          <div className="basic">
            <div className="label">Headline</div>
            <div className="value">
              <span>{userDetail.headLine}</span>
              <MdEdit
                size={20}
                color="rgba(167, 182, 194, 1)"
                className="edit-icon"
                onClick={() => this.togglePopover('headline', HeadlineSchema, 'UserDetails')}
              />
            </div>
          </div>
          <div className="basic">
            <div className="label">Country</div>
            <div className="value">
              <span style={{ textTransform: 'capitalize' }}>{userDetail.country}</span>
              <MdEdit
                size={20}
                color="rgba(167, 182, 194, 1)"
                className="edit-icon"
                onClick={() => this.togglePopover('country', CountrySchema, 'UserDetails')}
              />
            </div>
          </div>
          <div className="basic">
            <div className="label">Address</div>
            <div className="value">
              <span>{userDetail.address}</span>
              <MdEdit
                size={20}
                color="rgba(167, 182, 194, 1)"
                className="edit-icon"
                onClick={() => this.togglePopover('address', AddressSchema, 'UserDetails')}
              />
            </div>
          </div>
          <CarrierInterestSetting
            updateDatabaseSchema={updateDatabaseSchema}
            userDetail={userDetail}
            apis={apis}
          />
        </div>

      </>
    );
  }
}

const mapStateToProps = ({ account, database }) => ({ account, User: database.User, UserDetail: database.UserDetail });
export default connect(mapStateToProps, { ...actions })(BasicSettings);
