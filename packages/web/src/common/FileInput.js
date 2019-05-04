import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

class _FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fileInputRef = React.createRef();
  }

  onChange = (e) => {
    const { _action, schema, field, lastAction } = this.props;
    _action(schema, { [field]: e.target.files[0] });
    lastAction();
  };

  onClick = () => {
    this.fileInputRef.current.click();
  };

  changeStyle = (e) => {
    e.target.style.cursor = 'pointer';
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        onClick={this.onClick}
        // tabIndex="0"
        onKeyDown={this.onClick}
        role="button"
        onMouseOver={e => this.changeStyle(e)}
        onFocus={e => this.changeStyle(e)}
        className="image-upload-icon"
      >
        <Icon icon={IconNames.PLUS} intent={Intent.PRIMARY} iconSize="30" color="white" />
        <input
          ref={this.fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={e => this.onChange(e)}
        />
      </div>
    );
  }
}

_FileInput.defaultProps = {
  lastAction: null,
};

_FileInput.propTypes = {
  field: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
  lastAction: PropTypes.func,
  _action: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps)(_FileInput);
