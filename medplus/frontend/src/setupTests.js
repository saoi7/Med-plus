// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from "react-dom";

let test_dom_container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  test_dom_container = document.createElement("div");
  document.body.appendChild(test_dom_container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(test_dom_container);
  test_dom_container.remove();
  test_dom_container = null;
});

export { test_dom_container };
