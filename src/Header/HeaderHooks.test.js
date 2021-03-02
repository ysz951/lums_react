import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HeaderHooks from './HeaderHooks';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <HeaderHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})