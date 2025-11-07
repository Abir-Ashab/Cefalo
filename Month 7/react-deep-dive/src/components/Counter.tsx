import React, { Component } from 'react';

class Counter extends Component {
  // in class components, state is always an object, it can be named as anything like state, data, info etc
  state = {
    age: 42,
  };

  handleAgeChange = () => {
    // but you must use this.setState() method to update the state
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleAgeChange}>
        Increment age
        </button>
        <p>You are {this.state.age}.</p>
      </>
    );
  }
}

export default Counter;