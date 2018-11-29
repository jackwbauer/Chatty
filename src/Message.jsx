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
        const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/gi;
        let newContent = [];
        let images = [];
        let imgUrl = [];
        while ((imgUrl = imgRegex.exec(content)) !== null) {
            images.push({ url: imgUrl[0], index: imgUrl.index })
        }
        if(images && images.length > 0) {
            for(let i = 0; i < images.length; i++) {
                const subStrStart = images[i-1] ? images[i-1].index + images[i-1].url.length : 0;
                newContent.push(content.substring(subStrStart, images[i].index - 1))
                newContent.push(<div><br/><img src={images[i].url}/><br/></div>);
            }
        }
        return newContent;
    }

    render() {
        const { type, username, content } = this.props.message;
        const checkedContent = this.imageCheck(content);
        const message = checkedContent;
        if (type === "incomingMessage") {
            return (
                <div className="message">
                    <span style={this.usernameColor} className="message-username">{username}</span>
                    <span className="message-content">{message}</span>
                </div>
            )
        }
        return (
            <div className="message system">{content}</div>
        )

    }
}

export default Message;