import React from 'react';
import UserList from './user-list';

class Index extends React.Component {
  state={};

  render() {
    return (
      <div style={{ height: '100%', background: '#EFF3F8' }}>
        <UserList {...this.props} />
      </div>
    );
  }
}
export default Index;
