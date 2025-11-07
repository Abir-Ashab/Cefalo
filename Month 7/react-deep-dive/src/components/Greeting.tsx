import { Component } from 'react';

interface GreetingProps {
  name: string;
}

class Greeting extends Component<GreetingProps> {
  /*
  In class components, render() method is used to return JSX, you can't name it differently. Render can return any valid React node. This includes React elements such as <div />, strings, numbers, portals, empty nodes (null, undefined, true, and false), and arrays of React nodes.
  */

  render() { 
    return <h1>Hello, {this.props.name}!</h1>;
  }

  // String: render() { return 'Hello, ' + this.props.name + '!'; }


  // Number: render() { return 42; }

  /* Portal:
  render() { return ReactDOM.createPortal(<h1>Hello, {this.props.name}!</h1>, document.body); }
  */

  /* Empty nodes:
  render() { return null; }
  render() { return undefined; }
  render() { return true; }
  render() { return false; }
  */

  /* Array of react nodes
  render() { 
    return [<h1>Hello, {this.props.name}!</h1>, <p>Welcome to the React Deep Dive course.</p>]; 
  }
  */
}

export default Greeting;


/*
In a functional component, you don't need to write a render method because the function itself returns JSX directly. The returned value from the function is what React renders to the DOM.

For example:

function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

Here, the function body acts as the "render"—whatever you return is rendered by React. There’s no need for a separate render method as in class components.
*/