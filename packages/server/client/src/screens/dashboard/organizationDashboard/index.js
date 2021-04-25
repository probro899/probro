import React from 'react'
import { MdMyLocation } from 'react-icons/md';
import { connect } from 'react-redux';
import client from '../../../socket';
import Tabs from './Tabs';
import { ENDPOINT } from '../../../config';
import { Spinner } from '../../../common';

class OrganizationDashboard extends React.Component {
    state = { orgObj: null, apis: {} };

    async componentDidMount() {
      const apis = await client.scope('Mentor');
      const { database, match } = this.props;
      const orgId = match.params.orgId;
      this.setState({ apis, orgObj: Object.values(database.Organization.byId).find(o => o.id === parseInt(orgId, 10)) });
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      const { database, match } = this.props;
      const orgId = match.params.orgId;
      if (!prevState.orgObj) {
        const obj = Object.values(database.Organization.byId).find(o => o.id === parseInt(orgId, 10));
        if (obj) {
          this.setState({ orgObj: obj });
        }
      }
    }

    getLogo = () => {
      const { orgObj } = this.state;
      const imgUrl = orgObj.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(orgObj.uId, 10)}/organization/${orgObj.image}` : '/assets/graphics/organization.svg';
      return imgUrl;
    }

    render() {
      const { orgObj, apis } = this.state;
      if (!orgObj) return <Spinner />;
      const logo = this.getLogo();
      const { match, account, database } = this.props;
      return (
        <div className="pc-organization-dashboard">
          <div className="pc-org-dashboard-wrapper">
            <div className="pc-org-header">
              <figure className="pc-org-profile-img">
                  <img src={logo} alt="org profile" />
              </figure>
              <div className="pc-org-detail">
                <h2 className="pc-org-name">{orgObj.name}</h2>
                <div className="pc-org-location">
                  <MdMyLocation />
                  {' '}
                  <span style={{ fontSize: 12, marginLeft: 2 }}>
                    {' '}
                    {orgObj.address}
                  </span>
                </div>
              </div>
            </div>
            <Tabs match={match} account={account} orgObj={orgObj} database={database} apis={apis} {...this.props}/>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps)(OrganizationDashboard);
