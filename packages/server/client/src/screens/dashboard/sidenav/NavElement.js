import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavElement = (props) => {
    const { iconName, name, active, match, url } = props;
    return (
      <Link to={url ? `${match.url}/${url}` : match.url} className={active ? 'sideNavElement active' : 'sideNavElement'}>
        <span>{iconName}</span>
        <span>&nbsp;&nbsp;{name}</span>
      </Link>
    );
};
  
NavElement.defaultProps = {
    active: false,
};
  
NavElement.propTypes = {
    iconName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    active: PropTypes.bool,
};

export default NavElement;
