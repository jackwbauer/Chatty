import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import messagesData from '../data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Jack' },
      messages: [],
      socket: {},
      userCount: 0
    }
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(event) {
    if (event.key === "Enter") {
      const username = event.currentTarget.elements[0].value;
      console.log('here');
      const messageInput = event.currentTarget.elements[1].value;
      event.currentTarget.elements[1].value = '';
      let newMessage = {};
      if (this.state.currentUser.name !== username) {
        newMessage = {
          type: "incomingNotification",
          username: username,
          content: `${this.state.currentUser.name} changed their name to ${username}`
        }
        this.state.socket.send(JSON.stringify(newMessage));
        this.setState({ currentUser: { name: username } });
        console.log('Message sent to server');
      }
      if (messageInput) {
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
      const response = JSON.parse(event.data);
      const { userCount, message } = response;
      this.setState({ userCount });
      if (message) {
        const messages = this.state.messages.concat(message);
        this.setState({ messages });
      }
    }
    this.setState({ socket });
    console.log('Connected to server');
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} />
      </div>
    );
  }
}

export default App;
