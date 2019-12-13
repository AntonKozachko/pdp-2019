import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import { CreatePostForm } from '../CreatePost';
import { AuthProvider } from '../AuthProvider/use-auth';
import Header from '../Header';

export default function App() {
  return (
    <AuthProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header style={{ backgroundColor: 'none' }}>
          <Header />
        </Layout.Header>
        <Layout.Content>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/create-post" component={CreatePostForm} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Created by Ant UED
        </Layout.Footer>
      </Layout>
    </AuthProvider>
  );
}
