import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import sidenavStructure from './structure';
import NavElement from './NavElement';

class SideNav extends React.Component {
  state = {};

  componentDidMount() {
    const { updateNav } = this.props;
    updateNav({ schema: 'mainNav', data: { name: 'profileIcon' } });
  }

  isMentor = () => {
    const { account, UserDetail } = this.props;
    const userDetail = Object.values(UserDetail.byId).find((obj) => obj.userId === account.user.id);
    if (userDetail) return userDetail.type === 'mentor';
    return false;
  }

  render() {
    const { match, navigate } = this.props;
    const isMentor = this.isMentor();
    const navElements = sidenavStructure(isMentor);
    return (
      <div className="sideNav">
        {
          navElements.filter((o) => o.active).map((obj) => {
            return (
              <NavElement
                match={match}
                url={obj.url}
                name={obj.name}
                key={obj.name}
                iconName={obj.iconName}
                active={navigate.sideNav.name === obj.name}
              />
            );
          })
        }
      </div>
    );
  }
}

SideNav.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = ({ navigate, account, database }) => {
  return { navigate, account, UserDetail: database.UserDetail };
};

export default connect(mapStateToProps, { ...actions })(SideNav);
