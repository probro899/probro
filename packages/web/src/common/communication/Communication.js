import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';

class Communication extends React.Component {
  state = {
    minimize: true,
    cut: false,
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

  render() {
    const { minimize, cut } = this.state;
    return (
      <div
        className="communicate"
        style={cut ? { display: 'none' } : { display: 'block' }}
      >
        <div className="header">
          <div>
            Chat Window
          </div>
          <div>
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
          Hii
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Communication);
