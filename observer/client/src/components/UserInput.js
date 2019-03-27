import React, { Component } from 'react'

export default class UserInput extends Component {
    state = {
        inputValue: ''
    }

    _handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.inputValue) return;
        this.props.onPublish(this.state.inputValue);
        this.setState({ inputValue: '' });
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit} className='input-group mb-3'>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this._handleInputChange}
                    className='form-control'
                />
                <div className='input-group-append'>
                    <button className='btn btn-outline-dark'>Publish</button>
                </div>
            </form>
        )
    }
}
