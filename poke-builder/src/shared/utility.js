export const checkValidity = (value, rules) => {
    let errorMessage = [];
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '';
        if (!isValid) {
            errorMessage.push('Please fill in this field')
        }
    }

    if (rules.minLength) {
        if (value.length < rules.minLength) {
            isValid = false;
            errorMessage.push('Must be at least ' + rules.minLength + ' digits')
        }
    }

    if (rules.maxLength) {
        if (value.length > rules.maxLength) {
            isValid = false;
            errorMessage.push('Must be no more than ' + rules.minLength + ' digits')
        }
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test(value)) {
            isValid = false;
            errorMessage.push('Please enter a valid email');
        }
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        if (!pattern.test(value)) {
            isValid = false;
            errorMessage.push('Please enter a valid number');
        }
    }
    return { value: isValid, errorMessage: errorMessage };
}