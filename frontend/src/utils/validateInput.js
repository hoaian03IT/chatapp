import PropTypes from "prop-types";

export const validateInput = (type, value) => {
    const emailRegex = new RegExp(process.env.REACT_APP_REGEX_EMAIL);
    const minLengthPassword = Number(process.env.REACT_APP_MIN_LENGTH_PASS);

    if (type === "email") {
        return emailRegex.test(value);
    }
    if (type === "password") {
        return value.length >= minLengthPassword;
    }
};

validateInput.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
