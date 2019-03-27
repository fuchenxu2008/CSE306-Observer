import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        const { message } = this.props;
        const { content, username, created_at } = message || {};
        return (
            <li className='list-group-item'>
                <b>{content}</b>
                <div>{username}</div>
                <small>{created_at}</small>
            </li>
        )
    }
}
