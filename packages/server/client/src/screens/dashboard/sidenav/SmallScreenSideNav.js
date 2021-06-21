import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse } from '../../../common/Collapse';
import { Button } from '../../../common/utility-functions/Button/Button';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import sidenavStructure from './structure';

const NavElement = (props) => {
  const { name, active, match, toggleMenu, url } = props;
  return (
    <Link to={url ? `${match.url}/${url}` : match.url} onClick={toggleMenu} className={active ? 'sideNavElement active' : 'sideNavElement'}>
      <span>&nbsp;&nbsp;{name}</span>
    </Link>
  );
};

NavElement.defaultProps = {
  active: false,
  url: null,
};

NavElement.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  active: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired,
};

class SmallScreenSideNav extends React.Component {
  state = { open: false };

  toggleMenu = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  render() {
    const { open } = this.state;
    const { navigate, match } = this.props;
    const navElements = sidenavStructure();
    return (
      <div className="pc-small-screen-sidenav">
        <div>
          <Button
            onClick={this.toggleMenu}
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--medium"
            title={navigate.sideNav.name}
            icon={open ? <BsChevronUp /> : <BsChevronDown />}
            iconPosition="right"
          />
        </div>
        <Collapse isOpen={open} height={390}>
          <div className="pc-collapse-menu">
            {
              navElements.map((obj) => {
                return (
                  <NavElement
                    toggleMenu={this.toggleMenu}
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
        </Collapse>
      </div>
    );
  }
}

SmallScreenSideNav.propTypes = {
  navigate: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(SmallScreenSideNav);
