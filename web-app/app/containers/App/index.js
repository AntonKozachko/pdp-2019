import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { AuthProvider } from '../AuthProvider/use-auth';
import Header from '../Header';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Layout>
          <Layout.Header style={{ backgroundColor: 'none' }}>
            <Header />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Layout.Content>
        </Layout>
      </AuthProvider>
    </div>
  );
}
