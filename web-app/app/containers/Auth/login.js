import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Alert, Button } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { useAuth } from '../AuthProvider/use-auth';

const Login = ({ onLoginSuccess, form }) => {
  const auth = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        auth.login(values);
      }
    });
  };

  useEffect(() => {
    if (!isEmpty(auth.user.payload)) {
      onLoginSuccess();
    }
  }, [auth.user.payload]);

  const { getFieldDecorator } = form;
  const { error: userError } = auth.user;

  return (
    <Form onSubmit={handleSubmit}>
      {userError && (
        <Form.Item>
          <Alert message="Login error" type="error" description={userError} />
        </Form.Item>
      )}
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: 'Please input your Password!' },
            { min: 4, message: 'Password should not be less then 4 symbols' },
            { max: 15, message: 'Password max symbols is 15' },
          ],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export const LoginForm = Form.create({ name: 'login_form' })(Login);

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
  form: PropTypes.object.isRequired,
};
