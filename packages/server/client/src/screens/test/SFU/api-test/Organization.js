/* eslint-disable react/button-has-type */
import React from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../../config';

export default class Organiation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addOrganization = async () => {
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const uId = account.user.id;
    const res = await apis.addOrganization({
      name: 'Kantipur Engg Colz', 
      address: 'Dhapakhel', 
      email: 'kec@gmail.com', 
      phoneNo: '9844391441', 
      image: 'test-1234.jpg', 
      timeStamp: 12341431, 
      headLine: 'this is headler of organization kev',
      webSiteUrl: 'http://kec.com.np',
      uId,
    });
    console.log('Add Organization res', res);
  }

    updateOrganization = async () => {
      const { webRtc, account } = this.props;
      const { apis } = webRtc;
      const res = await apis.updateOrganization([{
        name: 'Kantipur Engg Colz updated',
      }, { id: 1 }]);
      console.log('udate res organization', res);
    }

    deleteOrganization = async () => {
      const { webRtc } = this.props;
      const { apis } = webRtc;
      const res = await apis.deleteOrganization({ id: 6 });
      console.log('delete organization res', res);
    }

    addOrganizationMember = async () => {
      const { webRtc, account } = this.props;
      const { apis } = webRtc;
      const uId = account.user.id;
      const res = await apis.addOrganizationMember({
        uId,
        oId: 1,
        type: 'student',
        noOfClass: null,
        status: 'pending',
      });
      console.log('addOrganization Memeber', res);
    }

    updateOrganizationMember = async () => {
      const { webRtc, account } = this.props;
      const { apis } = webRtc;
      const res = await apis.updateOrganizationMember([
        { status: 'verified' }, { id: 1 }]);
      console.log('UpdateOrganizationMember', res);
    }

    deleteOrganizationMember = async () => {
      const { webRtc, account } = this.props;
      const { apis } = webRtc;
      const res = await apis.deleteOrganizationMember({
        id: 1,
      });
      console.log('deleteOrganizationMember res', res);
    }

    verifyUser = async () => {
      try {
        const { account } = this.props;
        const userId = this.state.userId ? parseInt(this.state.userId, 10) : null;
        const res = await axios.post(`${ENDPOINT}/web/admin/verify-user`, { token: account.sessionId, userId: userId });
        console.log('Error in verifyUser', res);
      } catch (e) {
        console.error('Error in verify user', e);
      }
    }

    onChangeValueHanler = (e) => {
      console.log('Change value', e.target.value);
      this.setState({ userId: e.target.value });
    }

    render() {
      // console.log('Apis in api test', this.state);
      return (
          <div>
            <h4>Organization Api test</h4>
            <button onClick={this.addOrganization}> addOrganization </button>
            <button onClick={this.updateOrganization}> updateOrganization </button>
            <button onClick={this.deleteOrganization}> deleteOrganization</button>
            <div>
              <h4>Organiation member test</h4>
              <button onClick={this.addOrganizationMember}>addOrganizationMember</button>
              <button onClick={this.updateOrganizationMember}>updateOrganizationMember</button>
              <button onClick={this.deleteOrganizationMember}>deleteOrganizationMember</button>
            </div>
            <div>
              <h4>Verify User</h4>
              <button onClick={this.verifyUser}>Verify User</button>
              <input onChange={this.onChangeValueHanler} />
            </div>
          </div>
      );
    }
}
