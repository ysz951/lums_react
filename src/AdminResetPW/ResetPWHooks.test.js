import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ResetPWHooks from './ResetPWHooks';;
import { ContextProvider } from '../Context/Context';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ContextProvider>
        <ResetPWHooks />
      </ContextProvider>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})