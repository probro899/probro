import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';

class Classes extends Component {
  state = {
    gotoClassManager: false,
  };

  render() {
    const { gotoClassManager } = this.state;
    const id = sessionStorage.getItem('SESSION_ID');
    return (
      <div className="classes">
        { gotoClassManager && <Redirect push to={`/class-work/${id}/me`} /> }
        <div>
          <span style={{ fontSize: '25px', fontWeight: 500 }}>
            Classes
          </span>
          <Button
            text="Go to class"
            intent={Intent.PRIMARY}
            onClick={() => this.setState({ gotoClassManager: !gotoClassManager })}
          />
        </div>
      </div>
    );
  }
}

export default Classes;
