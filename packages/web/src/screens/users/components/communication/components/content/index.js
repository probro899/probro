import React from 'react';
import Media from './media';
import SideMenu from './side-menu';
import Messenger from './messenger';

class Index extends React.Component {
  state={};

  render() {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div style={{ background: 'white', width: '20%' }}>
          <SideMenu {...this.props} />
        </div>
        <div style={{ width: '80%' }}>
          <Messenger {...this.props} />
        </div>
      </div>
    );
  }
}
export default Index;
