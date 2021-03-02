import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ResetPWHooks from './ResetPWHooks';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ResetPWHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})