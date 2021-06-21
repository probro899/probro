/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar } from '../home/component';
import { CoverPicture } from './CoverPicture';
import client from '../../socket';
import OrganizationBasicInfo from './OrganizationBasicInfo';
import OrganizationHeadline from './OrganizationHeadline';
import { JoinedMembers } from './JoinedMembers';
import * as actions from '../../actions';
import Support from './Support';
import PopularOnPc from '../../common/PopularOnPc';
import Footer from '../../common/footer';
import clientQuery from '../../clientConfig';
import { GET_ORGANIZATION_DETAILS, GET_POPULAR } from '../../queries';
import { Spinner } from '../../common';

class OrganizationPublicView extends Component {
  state = {};

  async componentDidMount() {
    const { account, match, updateNav } = this.props;

    try {
      if (account.user) {
        const apis = await client.scope('Mentee');
        this.setState({ apis });
      }
      const res = await clientQuery.query({ query: GET_ORGANIZATION_DETAILS, variables: { orgId: match.params.orgId, sessionId: account.sessionId }, fetchPolicy: 'network-only' });
      if (res) {
        this.setState({ data: res.data.getOrganizationDetails, loading: false });
        updateNav({ schema: 'page', data: { title: res.data.getOrganizationDetails.name } });
      }

      const popularRes = await clientQuery.query({ query: GET_POPULAR, fetchPolicy: 'network-only' });
      if (popularRes) {
        this.setState({ popularOnPc: popularRes.data.getPopular });
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  async getSnapshotBeforeUpdate(prevProps) {
    const { account } = this.props;
    if (account.user && account.user !== prevProps.account.user) {
      try {
        const apis = await client.scope('Mentee');
        this.setState({ apis });
      } catch (e) {
        console.log('Error', e);
      }
    }
  }

  changeFetchedData = (orgData) => {
    this.setState({ data: orgData });
  }

  render() {
    const { apis, data, loading, popularOnPc } = this.state;
    if (loading) return <Spinner />;
    return (
      <>
        <Navbar />
        <div className="pc-organization-public-profile pc-container">
          <div className="pc-org-right-section pc-org-col">
            <CoverPicture />
            <OrganizationBasicInfo data={data} {...this.props} apis={apis} changeFetchedData={this.changeFetchedData} />
            <OrganizationHeadline {...data} />
            <JoinedMembers {...data} />
            <Support {...data} />
          </div>
          {popularOnPc && <PopularOnPc blogs={popularOnPc.blogs} mentors={popularOnPc.users} />}
        </div>
        <Footer />
      </>
    );
  }
}

OrganizationPublicView.propTypes = {
  updateNav: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(OrganizationPublicView);
