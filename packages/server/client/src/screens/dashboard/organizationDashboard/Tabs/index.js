import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from '../Home';
import Roles from '../Roles';
import Members from '../Members';
import Classrooms from '../Classrooms';
import Requests from '../Requests';

class Tabs extends React.Component {
    state = {
        tabHeader: ['Home', 'Roles', 'Members', 'Requests', 'Classrooms'],
        active: "",
    };

    setActiveHeader = (head) => this.setState({ active: head });

    render() {
        const { match, account, orgObj, database, apis } = this.props;
        const { tabHeader, active } = this.state;
        return (
            <div className="pc-tabs">
                <ul className="pc-tab-header">
                    {tabHeader.map((item, index) => (
                      <Link to={`/dashboard/${account.user.slug}/organization/${orgObj.id}/${item.toLowerCase()}`}>
                        <li
                            key={index}
                            className={item.toLowerCase() === active ? "active" : ""}
                        >
                          {item}
                        </li>
                      </Link>
                    ))}
                </ul>
                <div className="pc-tab-content">
                    <div className="tab-child">
                        <Switch> 
                            <Route exact path={`${match.path}/home`}>
                                <Home setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj} />
                            </Route>
                            <Route exact path={`${match.path}/roles`}>
                                <Roles apis={apis} setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj} />
                            </Route>
                            <Route exact path={`${match.path}/members`}>
                                <Members setActiveHeader={this.setActiveHeader} orgObj={orgObj} {...this.props} />
                            </Route>
                            <Route exact path={`${match.path}/classrooms`}>
                                <Classrooms setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj}/>
                            </Route>
                            <Route exact path={`${match.path}/requests`}>
                                <Requests setActiveHeader={this.setActiveHeader} database={database} orgObj={orgObj}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tabs;
