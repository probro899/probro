import React from 'react';
import { Form } from '../../../common';
import structure from './structure';

class AddAppointments extends React.Component {
    state = {};

    submit = async (data) => {
        const { callback } = this.props;
        const finalData = {
            ...data,
            startDate: data.startDate.valueOf(),
            endDate: data.endDate ? data.endDate.valueOf() : null,
        }
        await callback(finalData);
        if (this._isMounted) {
            return { response: 200, message: 'Successfully Created' };
        }
    }

    render() {
        const { classrooms, instance } = this.props;
        const formSchema = structure(classrooms, instance);
        return (
            <div className="add-appointment">
                <Form data={formSchema} callback={this.submit} />
            </div>
        )
    }
}

export default AddAppointments;
