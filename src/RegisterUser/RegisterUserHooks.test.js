import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RegisterUserHooks from './RegisterUserHooks';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RegisterUserHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})