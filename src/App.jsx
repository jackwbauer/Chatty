import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messagesData from '../data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      messages: messagesData
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(event) {
    if(event.key === "Enter") {
      const username = event.currentTarget.elements[0].value;
      const messageInput = event.currentTarget.elements[1].value;
      const newMessage = {
        type: messageInput ? "incomingMessage" : "incomingNotification",
        username: username,
        content: messageInput,
        id: this.state.messages.length + 1
      }
        const messages = this.state.messages.concat(newMessage);
        this.setState ({ messages });
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { type: "incomingMessage", username: "Michelle", content: "Hello there!", id: 200 };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;
