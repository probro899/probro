import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@blueprintjs/core';
import {Menu, MenuItem} from '../common/Menu';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
// import Popover from '../common/Form/Popover';
// more button popover here id holds the id of the board

const SmallMenu = (onclick, id) => {
  return (
    <Menu>
      <MenuItem
        icon={<MdEdit size={20}/>}
        text="Edit"
        onClick={() => onclick('edit', id)}
      />
      <MenuItem
        icon={<AiFillDelete size={20}/>}
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
