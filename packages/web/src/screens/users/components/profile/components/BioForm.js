import React from 'react';
import { Dialog, Button, Card, Icon, Portal } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { Form } from '../../../../../common';
import { portalSchema, bioSchema } from '../structure';

class BioForm extends React.Component {
  state = {
    portal: false,
  };

  addPortal = (data) => {
    this.togglePortal();
    return { response: 200 };
  }

  togglePortal = () => {
    const { portal } = this.state;
    this.setState({
      portal: !portal,
    });
  };

  render() {
    const { isOpen, onClose, callback } = this.props;
    const { portal } = this.state;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="popover-form bio">
          <div className="top">
            {portal ? 'Fill Portal Details' : 'Fill Bio Details'}
          </div>
          {portal
            ? (<div><Form data={portalSchema} callback={this.addPortal} /></div>)
            : <Form data={bioSchema} callback={callback} />
          }
        </div>
        <div style={{ display: 'flex', padding: '5px' }}>
          <Card
            elevation={2}
            interactive
            style={{ display: 'flex', flexDirection: 'row', padding: '2px', position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <Icon icon="edit" intent="primary" />
            </div>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <img
                alt="portal identity"
                height="50px"
                src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
              />
            </div>
            <div style={{ padding: '3px' }}>
              <span>
                <strong>Title</strong>
              </span>
              <br />
              <span>Description is what it takes to make it to the world label</span>
              <br />
              <span>Link</span>
              <br />
            </div>
          </Card>
        </div>
        <div
          style={{ width: '100%', padding: '0px 5px' }}
        >
          { portal
            ? <Button large text="Cancle" fill onClick={this.togglePortal} />
            : <Button large text="Add your portals" fill onClick={this.togglePortal} />
          }
        </div>
      </Dialog>
    );
  }
}

BioForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};

export default BioForm;
