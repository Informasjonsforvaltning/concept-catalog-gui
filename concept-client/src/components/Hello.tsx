import * as React from 'react';
import './Hello.scss';

export function Hello(props) {
  return (
    <div className="hello">
      <h1>Begrepskatalogen</h1>
      <h2 className="hellosmall">
        This the Begrepskatalogen {props.framework} application using {props.compiler} with {props.bundler}
      </h2>

      <button className="hellobutton">Click me!</button>
    </div>
  );
}
