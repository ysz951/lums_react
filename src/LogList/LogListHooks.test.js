import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LogListHooks from './LogListHooks';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LogListHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})