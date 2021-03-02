import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LicensePageHooks from './LicensePageHooks';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LicensePageHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})