import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messagesData from '../data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Jack' },
      messages: [],
      socket: {}
    }
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(event) {
    if (event.key === "Enter") {
      const username = event.currentTarget.elements[0].value;
      const messageInput = event.currentTarget.elements[1].value;
      const newMessage = {
        type: messageInput ? "incomingMessage" : "incomingNotification",
        username: username,
        content: messageInput,
        id: ''
      }
      this.state.socket.send(JSON.stringify(newMessage));
      console.log('Message sent to server');
      // const messages = this.state.messages.concat(newMessage);
      // this.setState({ messages });
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const socket = new WebSocket('ws://localhost:3001')
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      // console.log(newMessage);
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages });
    }
    this.setState({ socket });
    console.log('Connected to server');
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} />
      </div>
    );
  }
}

export default App;
