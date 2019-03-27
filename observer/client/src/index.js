import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import io from 'socket.io-client';
import UserInput from './components/UserInput';
import Message from './components/Message';
import { port } from '../../config';

class Index extends Component {
  state = {
    messages: [],
    subscribed: false,
    socket: null, // WebSocket object
  }

  componentDidMount() {
    const socket = io.connect(`http://localhost:${port}`);  // Connect to server
    socket.on('connect', () => {  // On connecting to server via Websocket
      console.log('connected');
      socket.on('messages', (messages) => { // Observe initial messages
        this.setState({ messages });
      })
      socket.on('disconnect', () => {
        console.log('disconnected');
      })
    })
    this.setState({ socket });
  }

  _handlePublishMessage = (content) => {
    const message = {
      content,
      username: 'Tourist',
      created_at: new Date().toLocaleString(),
    }
    this.setState((prevState) => ({
      messages: [...prevState.messages, message],
    }));
    this._publishMessage(message);
  }

  _publishMessage = (message) => {
    const { socket } = this.state;
    if (!socket) return console.log('Error! Socket not connected!');
    socket.emit('newMessage', message); // Emit an event to server
  }

  _handleSubscribe = () => {
    const { socket } = this.state;
    if (socket) {
      socket.on('newMessage', (message) => {  // Observe for new messages
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      })
    }
    this.setState({ subscribed: true });
  }

  _handleUnsubscribe = () => {
    const { socket } = this.state;
    if (socket) {
      socket.off('newMessage'); // Stop observing
    }
    this.setState({ subscribed: false });
  }

  render() {
    const { messages, subscribed } = this.state;
    const messageList = messages.map((message, i) => (
      <Message
        key={i}
        message={message}
      />
    ))

    return (
      <div className='container'>
        <h1 className='mt-5 mb-3'>
          CSE306 Demo
          <small className="badge badge-pill badge-primary ml-3">Observer</small>
        </h1>
        <UserInput onPublish={this._handlePublishMessage} />
        <button
          onClick={subscribed ? this._handleUnsubscribe : this._handleSubscribe}
          className='btn btn-outline-primary btn-lg btn-block mb-3'
        >
          {subscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
        <ul className='list-group'>
          {messageList}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById("app")
);