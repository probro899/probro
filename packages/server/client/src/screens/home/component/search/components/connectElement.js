import React from 'react';
import ConnectionElement from '../../public-profile/connections';

export default (props) => {
  return (
      <div>
        <ConnectionElement {...props} isSearch />
      </div>
        );
}