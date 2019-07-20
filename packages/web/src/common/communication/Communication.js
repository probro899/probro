import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import ChatList from './ChatList';
import ChatHistory from './ChatHistory';
import CallScreen from './CallScreen';

class Communication extends React.Component {
  state = {
    minimize: true,
    cut: false,
    screen: 'list',
  };

  toggleMinMax = () => {
    const { minimize } = this.state;
    this.setState({
      minimize: !minimize,
    });
  }

  cutWindow = () => {
    this.setState({
      cut: true,
    });
  }

  switchScreen = (target) => {
    this.setState({
      screen: target,
    });
  }

  render() {
    const { minimize, cut, screen } = this.state;
    return (
      <div
        className="communicate"
        style={cut ? { display: 'none' } : { display: 'block' }}
      >
        <div className="header">
          <div className="win-title">
            Chat Window
          </div>
          <div className="control-icons">
            { minimize ? <Icon icon="expand-all" style={{ cursor: 'pointer' }} onClick={this.toggleMinMax} />
              : <Icon icon="minus" style={{ cursor: 'pointer' }} onClick={this.toggleMinMax} />
            }
            <Icon icon="small-cross" style={{ cursor: 'pointer' }} onClick={this.cutWindow} />
          </div>
        </div>
        <div
          className="content"
          style={minimize ? { animationName: 'slideDown', animationDuration: '0.3s', height: '0px' } : { animationName: 'slideUp', animationDuration: '0.3s', height: '500px' }}
        >
          <ChatList
            style={screen === 'list' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
          />
          <ChatHistory
            style={screen === 'history' ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
          />
          <CallScreen
            style={screen === 'call' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Communication);
