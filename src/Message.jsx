import React, { Component } from "react";

class Message extends Component {
    usernameColor = {
        color: this.props.color ? this.props.color : '#000000'
    };

    regexIndexOf = (regex, string) => {
        var indexOf = string.substring(0).search(regex);
        return indexOf;
    }

    // break message into array to handle combintations of text and image urls
    imageCheck = (content) => {
        let newContent = [];
        content.forEach((piece) => {
            switch(piece.type) {
                case 'image':
                    newContent.push(<div><img className='message-image' src={piece.content}/></div>);
                    break;
                case 'text':
                    default:
                    newContent.push(piece.content);
                    break;
            }
        })
        return newContent;
    }

    render() {
        const { type, username, content } = this.props.message;
        console.log('message', this.props.message);
        console.log('content', content);
        const newContent = this.imageCheck(content);
        if (type === "incomingMessage") {
            return (
                <div className="message">
                    <span style={this.usernameColor} className="message-username">{username}</span>
                    <span className="message-content">{newContent}</span>
                </div>
            )
        }
        return (
            <div className="message system">{content}</div>
        )

    }
}

export default Message;