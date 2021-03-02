import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserLogHooks from './UserLogHooks';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserLogHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})