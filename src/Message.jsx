import React, { Component } from "react";

class Message extends Component {
    render() {
        const { type, userName, content } = this.props.message;
        if (type === "IncomingMessage") {
            return (
                <div className="message">
                    <span className="message-username">{userName}</span>
                    <span className="message-content">{content}</span>
                </div>
            )
        }
        return (
            <div className="message system">{content}</div>
        )

    }
}

export default Message;