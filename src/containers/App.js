import React from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';
import InternalServer from '../components/ErrorPages/NotFound/InternalServer/InternalServer';

const AsyncOwnerList = asyncComponent(() => {
  return import('./Owner/OwnerList/OwnerList');
});

const AsyncOwnerDetails = asyncComponent(() => {
  return import('./Owner/OwnerDetails/OwnerDetails');
});

const AsyncCreateOwner = asyncComponent(() => {
  return import('./Owner/CreateOwner/CreateOwner');
});

const AsyncCreateAccount = asyncComponent(() => {
  return import('./Account/CreateAccount/CreateAccount');
});

const AsyncUpdateOwner = asyncComponent(() => {
  return import('./Owner/UpdateOwner/UpdateOwner');
});

const AsyncDeleteOwner = asyncComponent(() => {
  return import('./Owner/DeleteOwner/DeleteOwner');
});

const AsyncDeleteAccount = asyncComponent(() => {
  return import('./Account/DeleteAccount');
});

const AsyncUpdateAccount = asyncComponent(() => {
  return import('./Account/UpdateAccount'); 
});

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/owner-list" component={AsyncOwnerList} />
        <Route path="/ownerDetails/:id" component={AsyncOwnerDetails} />
        <Route path="/createOwner" component={AsyncCreateOwner} />
        <Route path="/createAccount/:ownerId" component={AsyncCreateAccount} />
        <Route path="/updateOwner/:id" component={AsyncUpdateOwner} />
        <Route path="/updateAccount/:id" component={AsyncUpdateAccount} />
        <Route path="/deleteAccount/:id" component={AsyncDeleteAccount} />
        <Route path="/deleteOwner/:id" component={AsyncDeleteOwner} />
        <Route path="/500" component={InternalServer} />
        <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
