import PropTypes from "prop-types";

export const validateInput = (type, value) => {
    const emailRegex = new RegExp(process.env.REACT_APP_REGEX_EMAIL);
    const minLengthPassword = Number(process.env.REACT_APP_MIN_LENGTH_PASS);
    const maxLengthPassword = Number(process.env.REACT_APP_MAX_LENGTH_PASS);
    const maxLengthUsername = Number(process.env.REACT_APP_MAX_LENGTH_USERNAME);
    if (type === "username") {
        console.log(value.length <= maxLengthUsername && value.length > 0);
        return value.length <= maxLengthUsername && value.length > 0;
    }
    if (type === "email") {
        return emailRegex.test(value);
    }
    if (type === "password") {
        return value.length >= minLengthPassword && value.length <= maxLengthPassword;
    }
};

validateInput.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
