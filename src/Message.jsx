import React, { Component } from "react";

class Message extends Component {
    usernameColor = {
        color: this.props.color ? this.props.color : '#000000'
    };

    render() {
        const { type, username, content } = this.props.message;
        if (type === "incomingMessage") {
            return (
                <div className="message">
                    <span style={this.usernameColor} className="message-username">{username}</span>
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