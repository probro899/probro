import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import BioForm from './BioForm';
import { bioSchema } from '../structure';

class Bio extends React.Component {
  state = {};

  state = {
    bioEditPopover: false,
  };

  editBio = (data) => {
    const { apis, account, database } = this.props;
    console.log(data, apis, account, database);
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
        <p className="bio-content">About</p>
        <div className="bio-info">
          <p>
            Win or Learn
          </p>
          <p className="edit">
            <Icon icon="edit" onClick={this.togglePopover} />
          </p>
        </div>
        <BioForm
          isOpen={bioEditPopover}
          structure={bioSchema}
          callback={this.editBio}
          onClose={() => this.togglePopover()}
        />
      </div>
    );
  }
}

Bio.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

export default Bio;
