import { fromPairs } from 'lodash';
import React from 'react';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import { Button } from '../../../../common/utility-functions/Button/Button';

const PricingForm = () => {
    const options = [
        {
            value: 'NPR',
            label: 'NPR'
        },
        {
            value: 'USD',
            label: 'USD'
        },
        {
            value: 'EUR',
            label: 'EUR'
        },

    ]
    return (
        <div className="pricing-form">
            <FormSelectField
                options={options}
                onChange={() => { }}
                value={'test'}
            />
            <FormTextInput name="Price" value="" placeholder="Enter Price" onChange={() => { }} />
            <Button
                onClick={() => { }}
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--small"
                title="Save"
            />
        </div>
    )
}

export default PricingForm;
