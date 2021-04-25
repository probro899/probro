import React from 'react';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import NewSectionForm from './NewSectionForm';

export default class AddNewSectionForm extends React.Component{
    state = { title: '', objective: '' };

    onFieldValueChange = (field, value) => this.setState({ [field]: value });

    onFormSubmit = () => {
        const { title, objective } = this.state;
        const { addSection } = this.props;
        addSection({ title, objective });
    }

    render() {
        const { onClose } = this.props;
        const { title, objective } = this.state; 
        return (
            <NewSectionForm title="New Section:" formAction={this.onFormSubmit} onCancel={onClose} formActionTitle="Add Section">
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
