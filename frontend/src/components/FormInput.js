import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

import "../styles/form_input.scss";

export const FormInput = ({ submit, messageValue, setMessageValue }) => {
    const [showEmoji, setShowEmoji] = useState(false);

    const handleTogglePickerTable = () => {
        setShowEmoji(!showEmoji);
    };

    const handleSelectEmoji = (e) => {
        setMessageValue(messageValue + e.native);
    };

    const handleTypeMessage = (e) => {
        setMessageValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((e.keyCode === 13 && !e.shiftKey) || e.keyCode === undefined || e.keyCode === null) {
            if (messageValue.trim().length > 0) submit();
            setMessageValue("");
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
                className="textarea mx-2 py-2 px-3"
                as="textarea"
                value={messageValue}
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
};
