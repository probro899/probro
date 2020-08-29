import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core';

// more button popover here id holds the id of the board
const SmallMenu = (onclick, id) => {
  return (
    <Menu>
      <MenuItem
        icon="edit"
        text="Edit"
        onClick={() => onclick('edit', id)}
      />
      <Menu.Divider />
      <MenuItem
        icon="delete"
        intent="danger"
        text="Delete"
        onClick={() => onclick('delete', id)}
      />
    </Menu>
  );
};

class MoreButton extends React.Component {
  state = {};

  render() {
    // here id is the identifier of the container
    const { onMore, id } = this.props;
    return (
      <Popover
        content={SmallMenu(onMore, id)}
        position="right"
        className="more-button"
      >
        <Button
          icon="more"
          minimal
        />
      </Popover>
    );
  }
}

MoreButton.propTypes = {
  onMore: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default MoreButton;
