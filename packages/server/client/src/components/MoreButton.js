import React from 'react';
import PropTypes from 'prop-types';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { Menu, MenuItem } from '../common/Menu';
import Popover from '../common/Popover';
// more button popover here id holds the id of the board

const SmallMenu = (onclick, toggleOpen, id) => {
  return (
    <Menu>
      <MenuItem
        icon={<MdEdit size={20} />}
        text="Edit"
        onClick={() => {
          onclick('edit', id);
          toggleOpen();
        }}
      />
      <MenuItem
        icon={<AiFillDelete size={20} />}
        intent="danger"
        text="Delete"
        onClick={() => {
          onclick('delete', id)
          toggleOpen();
        }}
      />
    </Menu>
  );
};

class MoreButton extends React.Component {
  state = { isOpen: false };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isOpen === this.state.isOpen && nextProps.id === this.props.id) {
      return false;
    }
    return true;
  }

  toggleOpen = (popover=null, prev=null) => {
    const { isOpen } = this.state;
    if (popover) {
      this.setState({ isOpen: prev });
    } else {
      this.setState({ isOpen: !isOpen });
    }
  }

  render() {
    const { onMore, id } = this.props;
    const { isOpen } = this.state;
    return (
      <Popover
        content={SmallMenu(onMore, this.toggleOpen, id)}
        isOpen={isOpen}
        toggleOpen={this.toggleOpen}
        vPosition="bottom"
        hPosition="left"
        xAlign="right"
        yAlign="bottom"
        className="more-button"
      >
        <FiMoreHorizontal size={25} color="#1d4354" />
      </Popover>
    );
  }
}

MoreButton.propTypes = {
  onMore: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default MoreButton;
