import React, { useState, useEffect } from 'react';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import { Button } from '../../../../common/utility-functions/Button/Button';

const options = [
    { value: 'NPR', label: 'NPR' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
]

const PricingForm = ({ priceDetails, toggleAlert, savePrice }) => {
    const [currency, setCurrency] = useState('NPR');
    const [price, setPrice] = useState(null);
    const [discount, setDiscount] = useState(null);

    useEffect(() => {
        if (priceDetails) {
            setPrice(priceDetails.price);
            setCurrency(priceDetails.currency);
            setDiscount(priceDetails.discount);
        }
    }, [])

    const submitPrice = () => {
        if (price < 1) {
            toggleAlert({ status: 'error', isOpen: true, message: 'You can not put price less than 1. Please put a higher price.' });
            return;
        }
        savePrice({ currency, price, discount });
    }

    return (
        <div className="pricing-form">
            <FormSelectField
                options={options}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
                value={currency}
            />
            <FormTextInput type="number" label="Price" name="price" value={price} placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
            <FormTextInput type="number" label="Discount" name="discount" value={discount} placeholder="Enter Discount" onChange={(e) => setDiscount(e.target.value)} />
            <Button
                onClick={submitPrice}
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--small"
                title="Save"
            />
        </div>
    )
}

export default PricingForm;
