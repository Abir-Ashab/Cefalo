import React from 'react';

const App = () => {
  // return <p className="danger">Hello React</p>; ---> internally this calls React.createElement like the following

  /*
  As mentioned, React's createElement() method is called internally. Therefore we could use it as replacement for the returned JSX (for the sake of learning). React's createElement method takes a type, props, and children as arguments. We provide the HTML tag 'p' as first argument, the props as an object with the className as second argument, and the children as third argument:
  */
  return React.createElement(
    'p',
    { className: 'danger' },
    'Hello React'
  );
};

console.log(App());

/* {
  $$typeof: Symbol(react.element)
  "type": "p",
  "key": null,
  "ref": null,
  "props": {
    "children": "Hello React",
    "className": "danger"
  },
  "_owner": null,
  "_store": {}
}

children represents everything that's rendered between the HTML tags
*/

export default App;