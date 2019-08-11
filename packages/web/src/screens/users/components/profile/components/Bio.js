import React from 'react';
import { Icon } from '@blueprintjs/core';
import BioForm from './BioForm';
import { bioSchema } from '../structure';

class Bio extends React.Component {
  state = {};

  state = {
    bioEditPopover: false,
  };

  editBio = (data) => {
    // to be handled
    return { response: 200 };
  }

  togglePopover = () => {
    const { bioEditPopover } = this.state;
    this.setState({
      bioEditPopover: !bioEditPopover,
    });
  }

  render() {
    const { bioEditPopover } = this.state;
    return (
      <div className="bio">
        <BioForm
          isOpen={bioEditPopover}
          structure={bioSchema}
          callback={this.editBio}
          onClose={() => this.togglePopover()}
        />
        <p />
        <p>
          &#34; Win or Learn &#34;
        </p>
        <p className="edit">
          <Icon icon="edit" onClick={this.togglePopover} />
        </p>
      </div>
    );
  }
}

export default Bio;
