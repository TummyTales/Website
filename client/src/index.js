import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
  domain="dev-q3qye2ygdkol06n6.us.auth0.com"
  clientId="xIAQZ5apdyuWD0QNvDD45vqSX373Kekt"
  audience="https://dev-q3qye2ygdkol06n6.us.auth0.com/api/v2/"
  scope="openid profile email"
  authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);


