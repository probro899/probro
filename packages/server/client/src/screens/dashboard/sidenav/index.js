import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import sidenavStructure from './structure';
import NavElement from './NavElement';

class SideNav extends React.Component {
    state = {}
  
    componentDidMount() {
      const { updateNav } = this.props;
      updateNav({ schema: 'mainNav', data: { name: 'profileIcon' }});
    }

    // isMentor = () => {
    //   const { account, database } = this.props;
    //   const userDetail = Object.values(database.UserDetail.byId).find(obj => obj.userId === account.user.id);
    //   if (userDetail) return userDetail.type === 'mentor' ? true : false;
    //   return false;
    // }
  
    render() {
      const navElements = sidenavStructure();
      const { match, navigate } = this.props;
      return (
        <div className="sideNav">
          {
            navElements.map((obj) => {
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
  
  const mapStateToProps = (state) => {
    const { navigate, account, database } = state;
    return { navigate, account, database };
  };
  
  export default connect(mapStateToProps, { ...actions })(SideNav);
  