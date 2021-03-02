import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserListHooks from './UserListHooks';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <UserListHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})