import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';

export default function AdminAndSuperRoute({ component, ...props }) {
  const Component = component;
  const role = localStorage.getItem('role');
  return (
    <Route
      {...props}
      render={componentProps => 
        TokenService.hasAuthToken()
        ? (role === 'ROLE_ADMIN' || role === 'ROLE_SUPERUSER') 
        ?
        <Component {...componentProps} {...props} 
            key={Object.values(componentProps.match.params).join(",")}
          />
        :
          <Redirect
            to={{
              pathname: '/license',
              state: { from: componentProps.location }
            }}
          />
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: componentProps.location }
            }}
          />
      }
    />
  );
};
