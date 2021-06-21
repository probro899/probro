import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import Home from '../Home';
import Roles from '../Roles';
import Members from '../Members';
import Classrooms from '../Classrooms';
import Requests from '../Requests';
import Invitaions from '../invitations';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
    };
  }

  tabsProvider = () => {
    const { orgObj } = this.props;
    switch (orgObj.role) {
      case 'admin':
        return ['Home', 'Roles', 'Members', 'Requests', 'Invitations', 'Classrooms'];
      case 'manager':
        return ['Home', 'Members', 'Requests', 'Invitations', 'Classrooms'];
      default:
        return [];
    }
  }

    setActiveHeader = (head) => this.setState({ active: head });

    render() {
      const { match, account, orgObj, database, apis } = this.props;
      const { active } = this.state;
      return (
        <div className="pc-tabs">
          <ul className="pc-tab-header">
            {this.tabsProvider().map((item, index) => (
              <Link key={`org-nav-${index}`} replace to={`/dashboard/${account.user.slug}/organization/${orgObj.id}/${item.toLowerCase()}`}>
                <li className={item.toLowerCase() === active ? "active" : ""}>{item}</li>
              </Link>
            ))}
          </ul>
          <div className="pc-tab-content">
            <div className="tab-child">
              <Switch> 
                <Route exact path={`${match.path}/home`}>
                  <Home setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj} />
                </Route>
                { orgObj.role === 'admin' && (
                <Route exact path={`${match.path}/roles`}>
                  <Roles apis={apis} setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj} {...this.props} />
                </Route>
                )}
                <Route exact path={`${match.path}/members`}>
                  <Members setActiveHeader={this.setActiveHeader} orgObj={orgObj} {...this.props} />
                </Route>
                <Route exact path={`${match.path}/classrooms`}>
                  <Classrooms setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj} {...this.props} />
                </Route>
                <Route exact path={`${match.path}/requests`}>
                  <Requests setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj} {...this.props} />
                </Route>
                <Route exact path={`${match.path}/invitations`}>
                  <Invitaions setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj} {...this.props} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      );
    }
}

export default Tabs;
Tabs.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired, 
  account: PropTypes.objectOf(PropTypes.any).isRequired, 
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired, 
  database: PropTypes.objectOf(PropTypes.any).isRequired, 
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};
