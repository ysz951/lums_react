import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SaleListHooks from './SaleListHooks';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SaleListHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})