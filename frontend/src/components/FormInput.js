import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

import "../styles/form_input.scss";
import { Button, Form } from "react-bootstrap";
import React, { forwardRef, useState } from "react";

// eslint-disable-next-line no-empty-pattern
export const FormInput = forwardRef(({ submit }, ref) => {
    const [valueInput, setValueInput] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    const handleTogglePickerTable = () => {
        setShowEmoji(!showEmoji);
    };

    const handleSelectEmoji = (e) => {
        setValueInput(valueInput + e.native);
    };

    const handleTypeMessage = (e) => {
        setValueInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((e.keyCode === 13 && !e.shiftKey) || e.keyCode === undefined || e.keyCode === null) {
            if (valueInput.trim().length > 0) submit();
            setValueInput("");
        }
    };

    return (
        <form className="form-input p-3 d-flex align-items-center" onSubmit={(e) => handleSubmit(e)}>
            <div className="emoji">
                <BsEmojiSmile className="icon-emoji fs-3" onClick={handleTogglePickerTable} />
                {showEmoji && (
                    <div className="picker-table">
                        <Picker data={data} onEmojiSelect={handleSelectEmoji} />
                    </div>
                )}
            </div>
            <Form.Control
                autoFocus
                ref={ref}
                className="textarea mx-2 py-2 px-3"
                as="textarea"
                value={valueInput}
                role="textbox"
                rows={1}
                onChange={(e) => handleTypeMessage(e)}
                onKeyUp={(e) => handleSubmit(e)}
                placeholder="Type message..."
            />
            <Button type="submit" className="d-flex align-items-center">
                Send <AiOutlineSend className="ms-2" />
            </Button>
        </form>
    );
});
