import React, { FunctionComponent } from 'react';
import './Hello.scss';

interface Props {
  framework: string;
  compiler: string;
  bundler: string;
}

export const Hello: FunctionComponent<Props> = ({ framework, compiler, bundler }: Props): JSX.Element => {
  return (
    <div className="hello">
      <h1>Begrepskatalogen</h1>
      <h2 className="hellosmall">
        This the Begrepskatalogen {framework} application using {compiler} with {bundler}
      </h2>

      <button className="hellobutton">Click me!</button>
    </div>
  );
};
