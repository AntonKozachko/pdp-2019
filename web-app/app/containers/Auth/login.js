import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Row, Col, Alert } from 'antd';

import { useAuth } from '../AuthProvider/use-auth';

export const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({});
  const [loginError, setLoginError] = useState();
  const auth = useAuth();

  const handleUsername = e => {
    e.preventDefault();
    const username = e.target.value;

    setCredentials({ ...credentials, username });
  };

  const handlePassword = e => {
    e.preventDefault();
    const password = e.target.value;

    setCredentials({ ...credentials, password });
  };

  const handleUser = async () => {
    const { username, password } = credentials;
    try {
      await auth.login(username, password);

      onLoginSuccess();
    } catch (e) {
      setLoginError(e);
    }
  };

  return (
    <Fragment>
      {loginError && (
        <Row gutter={[20, 20]}>
          <Col>
            <Alert message={loginError} type="error" />
          </Col>
        </Row>
      )}

      <Row gutter={[20, 20]}>
        <Col>
          <Input
            placeholder="Enter your username"
            onChange={handleUsername}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col>
          <Input
            placeholder="Enter your password"
            onChange={handlePassword}
            type="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col>
          <Button
            block
            type="primary"
            onClick={handleUser}
            loading={auth.user.loading}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
};
