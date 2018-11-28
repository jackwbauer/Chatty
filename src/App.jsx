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
      console.log('here');
      const messageInput = event.currentTarget.elements[1].value;
      let newMessage = {};
      if(this.state.currentUser.name !== username) {
        newMessage = {
          type: "incomingNotification",
          username: username,
          content: `${this.state.currentUser.name} changed their name to ${username}`
        }
        this.state.socket.send(JSON.stringify(newMessage));
        this.setState({ currentUser: { name: username }});
        console.log('Message sent to server');
      }
      if(messageInput) {
        newMessage = {
          type: "incomingMessage",
          username: username,
          content: messageInput
        }
        this.state.socket.send(JSON.stringify(newMessage));
        console.log('Message sent to server');
      }
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
