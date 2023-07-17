import React, { Component } from 'react'

export default class FormAction extends Component {
    state = {
        userName: '',
        city: '',
    };

    onChangeHandler = (event) => {
        // this.setState({ userName: event.target.value});
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        alert(this.state.userName);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <h1>Form Action</h1>
                    <input name="userName" onChange={this.onChangeHandler} type="text"></input>
                    <p>User Name is {this.state.userName}</p>
                    <input name='city' onChange={this.onChangeHandler}></input>
                    <p>City: {this.state.city}</p>
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        )
    }
}
