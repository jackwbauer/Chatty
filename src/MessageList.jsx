import React, { Component } from "react";
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props) {
        super();
        this.state = { messages: props.messages };
    }

    addMessage(message) {
        messages.push(message);
        this.setState ({ messages })
    }

    render() {
        const messageList = this.state.messages.map(message => {
            return <Message message={message} />
        });
        return (
            <main className="messages">
                {messageList}
            </main>
        )
    }
}

export default MessageList;