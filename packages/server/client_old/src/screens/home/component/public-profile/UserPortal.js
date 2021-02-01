import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';
import { ENDPOINT } from '../../../../config';

const UserPortal = ({ data }) => {
  return (
    <a href={data.link ? data.link : '#'} style={{ color: 'black', textDecoration: 'none' }} rel="noopener noreferrer" target="_blank">
      <Card
        elevation={2}
        interactive
        style={{ marginRight: 10, marginBottom: 10, display: 'flex', flexDirection: 'row', padding: '2px', position: 'relative' }}
      >
        {
          data.attachment && (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <img
                height={50}
                alt="portal identity"
                src={`${ENDPOINT}/user/${10000000 + parseInt(data.userId, 10)}/profile/${data.attachment}`}
              />
            </div>
          )
        }
        <div style={{ padding: '3px' }}>
          <span>
            <strong>{data.title}</strong>
          </span>
          <br />
          <span>{data.description}</span>
          <br />
        </div>
      </Card>
    </a>
  );
};

UserPortal.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserPortal;
