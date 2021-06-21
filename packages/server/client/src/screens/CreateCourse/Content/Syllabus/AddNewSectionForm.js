import React from 'react';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import NewSectionForm from './NewSectionForm';

export default class AddNewSectionForm extends React.Component{
  state = { title: '', objective: '' };

  componentDidMount() {
    const { title, objective } = this.props;
    if (title) this.setState({ title, objective });
  }

  onFieldValueChange = (field, value) => this.setState({ [field]: value });

  onFormSubmit = () => {
    const { title, objective } = this.state;
    if (title.trim().length < 1) return;
    const { callback } = this.props;
    callback({ title, objective });
  }

  render() {
      const { onClose, id } = this.props;
      const { title, objective } = this.state; 
      return (
          <NewSectionForm
              title={id ? "Edit Section:" : "New Section:"}
              formAction={this.onFormSubmit}
              onCancel={onClose}
              formActionTitle="Save"
          >
              <div className="form-group">
                  <FormTextInput name="title" onChange={(e) => this.onFieldValueChange('title', e.target.value)} value={title} placeholder="Enter a title" />
              </div>
              <div className="form-group">
                  <FormTextInput name="objective" value={objective} onChange={(e) => this.onFieldValueChange('objective', e.target.value)} placeholder="Enter a learning Objective" label="What will students be able to do at the end of this section?" />
              </div>
          </NewSectionForm>
      )
  }
}
