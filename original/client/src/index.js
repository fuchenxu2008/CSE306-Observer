import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import UserInput from './components/UserInput';
import Message from './components/Message';
import { port } from '../../config';

class Index extends Component {
  state = {
    messages: [], // Local message list
    subscribed: false,
    pollingTimer: null, // ID of timer to destroy later
  }

  // On page load
  componentDidMount() {
    this._getMessages();
  }

  _getMessages = () => {
    axios.get(`http://localhost:${port}/message`)
      .then(({ data }) => {
        this.setState({ // Update message list (replace)
          messages: data.messages,
        })
      })
      .catch(err => console.log(err))
  }

  _handlePublishMessage = (content) => {
    const message = {
      content,
      username: 'Tourist',
      created_at: new Date().toLocaleString(),
    }
    this.setState((prevState) => ({ // Updating local messages directly for experience (concatenation)
      messages: [...prevState.messages, message],
    }));
    this._publishMessage(message);
  }

  _publishMessage = (message) => {
    axios.post(`http://localhost:${port}/message`, { message })
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err));
  }

  _handleSubscribe = () => {
    const pollingTimer = setInterval(this._getMessages, 1000);  // Intervally refresh for new message (replace)
    this.setState({ // Store timer ID
      pollingTimer,
      subscribed: true,
    })
  }

  _handleUnsubscribe = () => {
    const { pollingTimer } = this.state;
    clearInterval(pollingTimer);  // Distroy timer
    this.setState({
      pollingTimer: null,
      subscribed: false,
    });
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
          <span className="badge badge-pill badge-secondary ml-3">Original</span>
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