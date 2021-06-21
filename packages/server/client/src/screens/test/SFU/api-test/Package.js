/* eslint-disable react/button-has-type */
import React from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../../config';

export default class Package extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    addPackage = async () => {
      try {
        const { account } = this.props;
        const userId = this.state.userId ? parseInt(this.state.userId, 10) : null;
        const res = await axios.post(
          `${ENDPOINT}/web/admin/add-package`,
          {
            token: account.sessionId,
            noOfClass: 50,
            price: 50000,
            descrition: 'This is free package for test',
            type: 'Free',
            classType: 'large',
          }
        );
        console.log('Error in verifyUser', res);
      } catch (e) {
        console.error('Error in verify user', e);
      }
    }

    addSellPackage = async () => {
      const { webRtc, account } = this.props;
      const { apis } = webRtc;
      const uId = account.user.id;
      const res = await apis.addSellPackage({
        oId: 24,
        uId,
        packageId: 1,
        type: 'organization',
      });
      console.log('Add sellPackage res', res);
    }

    addPackageDescription = async () => {
      try {
        const { account } = this.props;
        const userId = this.state.userId ? parseInt(this.state.userId, 10) : null;
        const res = await axios.post(
          `${ENDPOINT}/web/admin/add-package-description`,
          {
            token: account.sessionId,
            packageId: 2,
            oneToOneChat: 1,
            oneToOneCall: 1,
            groupChat: 1,
            groupCall: 1,
            screensharing: 1,
            callRecording: 1,
            noOfUserInclassRoom: 50,
            drawingBoard: 1,
            blogging: 1,
            reporting: 1,
            notificationOfAllClassActivity: 1,
            descrition: 'Free package for Organization',
            projectManagementTool: 1,
            classType: 'Medium',
            remarks: 'Some remars about this package',
          }
        );
        console.log('Error in verifyUser', res);
      } catch (e) {
        console.error('Error in verify user', e);
      }
    }

    render() {
      // console.log('Apis in api test', this.state);
      return (
        <div>
          <h4>Package Api test</h4>
          <button onClick={this.addPackage}> addPackage </button>
          <button onClick={this.addPackageDescription}> addPackageDescription </button>
          <button onClick={this.addSellPackage}>addSellPackage</button>
        </div>
      );
    }
}
