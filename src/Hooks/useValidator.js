import validate from 'validate.js';

const useValidator = () => {

    return (formData) => {
        var constraints = {
            name: {
                presence: true,
                length: {
                    minimum: 4,
                    maximum: 25,
                },
                format: {
                    pattern: /^[a-zA-Z\s]*$/,
                    flags: "i",
                    message: ": Sorry! can only contain letters"
                  }
            },
            email: {
                email: true
            },
            userType: {
                presence: true,
            },
            password: {
                presence: true,
                length: {
                    minimum: 8,
                    maximum: 16,
                },
            }
        };
        return validate(formData, constraints)
    }
}

export default useValidator;