import React from 'react';
import Sound from 'react-sound';
import Controller from '../controller';
import ringtone from '../../../../../../assets/ringtone.mp3';
import BoardImage from '../../../../../../assets/imageUploadIcon.png';

export default (props) => {
  return (
    <div className="handle" style={{ height: 250, width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(78, 185, 240, 1)' }}>
      <Sound url={ringtone} playStatus={Sound.status.PLAYING} playFromPosition={0} loop />
      <img src={ BoardImage} alt="Board" style={{ height: 100, width: 100, borderRadius: '50%', border: 'solid', borderWidth: 1, borderColor: 'white'  }}/>
      <span style={{ color: 'green', fontSize: 20 }}>call...</span>
      <div>
        <Controller {...props} incomming />
      </div>
    </div>
  );
};
