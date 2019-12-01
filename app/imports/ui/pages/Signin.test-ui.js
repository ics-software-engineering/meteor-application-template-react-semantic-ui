import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { HashRouter as Router, Route } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import Signin from './Signin';


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Renders Sign in page', () => {
  const fakeLocation = {
    state: 'fake state'
  };
    act(() => {
        render(<Router><Signin location={fakeLocation}/></Router>, container);
    });
    const signin = document.querySelector("[data-testid=signin]");
    expect(signin.querySelector("h2").textContent).toBe('Login to your account');
});