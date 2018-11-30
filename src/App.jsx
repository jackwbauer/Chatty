import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Jack', color: '' },
      messages: [],
      socket: {},
      userCount: 0,
    }
    this.newMessage = this.newMessage.bind(this);
    this.scrollRef = React.createRef();
  }

  newMessage(event) {
    if (event.key === "Enter") {

      // gets username from username form input element
      const username = event.currentTarget.elements[0].value;

      //gets message from message form input element
      const messageInput = event.currentTarget.elements[1].value;

      //resets message form input element to be empty
      event.currentTarget.elements[1].value = '';

      let newMessage = {};

      // if user changes their username
      if (this.state.currentUser.name !== username) {
        newMessage = {
          type: "incomingNotification",
          username: username,
          content: `${this.state.currentUser.name} changed their name to ${username}`
        }
        this.state.socket.send(JSON.stringify(newMessage));
        this.setState({ currentUser: { name: username, color: this.state.currentUser.color } });
        console.log('Message sent to server');
      }
      if (messageInput) {
        newMessage = {
          type: "incomingMessage",
          username: username,
          content: messageInput,
          color: this.state.currentUser.color
        }
        this.state.socket.send(JSON.stringify(newMessage));
        console.log('Message sent to server');
      }
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const { userCount, color, message } = response;
      console.log(message);

      // set color of current user
      if (color) {
        this.setState({ currentUser: { name: this.state.currentUser.name, color } });
      }

      // update dsiplayed amount of users connected to server
      this.setState({ userCount });

      // add message to stored list of messages
      if (message) {
        const messages = this.state.messages.concat(message);
        this.setState({ messages });
      }
    }

    this.setState({ socket });
    console.log('Connected to server');
  }

  componentDidUpdate() {
    this.scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <div ref={this.scrollRef}></div>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} />
      </div>
    );
  }
}

export default App;
