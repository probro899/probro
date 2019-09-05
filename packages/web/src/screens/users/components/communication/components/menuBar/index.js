import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';

const menuStyle = color => ({
  borderRadius: '50%',
  background: color,
  height: 15,
  width: 15,
  borderWidth: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 2,
  margin: 2,
});

const MenuBar = (props) => {
  console.log('props in menu bar', props);
  const { updateWebRtc, webRtc, database } = props;
  return (
    <div className="handle" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', background: 'green' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}><span style={{ color: 'white' }}>{database.Board.byId[webRtc.showCommunication].name}</span></div>
      <div style={{
        height: 'auto',
        background: 'green',
        display: 'flex',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        width: 'auto',
        alignItems: 'center',
        padding: 2,
      }}
      >
        <div style={menuStyle('rgba(78, 185, 255, 1)')}>
          <Icon icon="minimize" style={{ color: 'white' }} iconSize={10} />
        </div>
        <div style={menuStyle('rgba(78, 185, 255, 1)')}>
          <Icon icon="maximize" style={{ color: 'white' }} iconSize={10} />
        </div>
        <div style={menuStyle('red')}>
          <Icon icon="cross" style={{ color: 'white' }} onClick={() => updateWebRtc('showCommunication', null)} />
        </div>
      </div>
    </div>
  );
};
export default MenuBar;
MenuBar.propTypes = {
  updateWebRtc: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};
