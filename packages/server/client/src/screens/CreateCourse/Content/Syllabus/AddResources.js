import React, { Component } from 'react'
import { GrFormAdd } from "react-icons/gr";
import { Editor } from '../../../../common';
import { Button } from '../../../../common/utility-functions/Button/Button';
import NewSectionForm from './NewSectionForm';

export default class AddResources extends Component {
    state = { courseDescription: '' };

    onChange = (id, value) => {
        this.setState({
            [id]: value,
        });
    }

    render() {
        const { showContent } = this.props;
        return (
            <>
                {
                    showContent &&
                    <>
                        <div className="add-resources">
                            <NewSectionForm title="" formActionTitle="Save">
                                <div className="form-group">
                                    <Editor label="Course Description" id="courseDescription" value={this.state.courseDescription} name="courseDescription" onChange={this.onChange} />
                                </div>
                            </NewSectionForm>
                        </div>
                    </>
                }
            </>
        )
    }
}
