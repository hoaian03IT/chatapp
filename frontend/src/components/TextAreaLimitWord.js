import { FormControl, FormGroup } from "react-bootstrap";

import "../styles/textarea_limit_word.scss";

export const TextAreaLimitWord = ({
    className,
    value,
    setValue,
    rows = 4,
    limitWord = 200,
    positionLimit = "right",
    placeholder,
}) => {
    const handleChange = (e) => {
        if (e.target.value.length <= limitWord) setValue(e.target.value);
    };
    return (
        <FormGroup className={`textarea-limit-word position-relative`}>
            <FormControl
                as="textarea"
                className={`textarea ${className}`}
                rows={rows}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange(e)}
            />
            <span className={`limit-words ${positionLimit} position-absolute`}>
                {value.length}/{limitWord}
            </span>
        </FormGroup>
    );
};
