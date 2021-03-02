import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LicenseListHooks from './LicenseListHooks';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LicenseListHooks />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})