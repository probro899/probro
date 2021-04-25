import emailValidator from './emailValidator';
import urlValidator from './urlValidator';
import mobileValidator from './mobileValidator';


export default (fields, data) => {
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj.specialType) {
            switch (obj.specialType) {
                case "email":
                    const checkEmail = emailValidator(fields[obj.id]);
                    if (!checkEmail) {
                        return { valid: false, message: 'Invalid Email' };
                    }
                    break;
                case "mobile":
                    const checkMobile = mobileValidator(fields[obj.id]);
                    if (!checkMobile) {
                        return { valid: false, message: 'Invalid Number' };
                    }
                    break;
                case "url":
                    const checkUrl = urlValidator(fields[obj.id]);
                    if (!checkUrl) {
                        return { valid: false, message: 'Invalid Url' };
                    }
                    break;
                default:
                    break;
            }
        }
    };
    return { valid: true, message: 'Data is valid' };
}
