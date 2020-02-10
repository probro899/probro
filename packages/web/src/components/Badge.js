import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => {
  const { number, size, top } = props;
  let num = number;
  if (number > 9) {
    num = '9+';
  }
  return (
    <span style={{
      position: 'absolute',
      left: size,
      top: top || 4,
      textAlign: 'center',
      padding: '2px',
      borderRadius: '50%',
      backgroundColor: '#e92821',
      color: 'white',
      fontSize: '10px',
      width: '15px',
      height: '15px',
    }}
    >
      {num}
    </span>
  );
};

Badge.propTypes = {
  number: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default Badge;
