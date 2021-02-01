import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';

class Message extends React.Component {
  state = {};

  async componentDidMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'sideNav',
      data: { name: 'Messages' },
    });
  }

  render() {
    return (
      <div className="message bro-right">
        Hello Messages
      </div>
    );
  }
}

Message.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Message);
