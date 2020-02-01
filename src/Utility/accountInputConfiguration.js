import moment from 'moment';

export const returnInputConfigurationAccount = () => {
    return {
        accountType: {
            element: 'input', type: 'text', value: '',
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Account Type:'
        },
        dateCreated: {
            element: 'datePicker', type: 'text', value: moment(),
            valid: true, touched: false,
            errorMessage: '', label: 'Date Created:'
        }
    }
}