import React, { Component } from "react";

class ChatBar extends Component {

    render() {
        return (
            <form className="chatbar" onKeyPress={this.props.newMessage}>
                <input name="username" className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)"/>
                <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </form>
        )
    }
}

export default ChatBar;