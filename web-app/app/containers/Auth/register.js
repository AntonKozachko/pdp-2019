import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Alert, Button } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { useAuth } from '../AuthProvider/use-auth';

const Register = ({ onLoginSuccess, form }) => {
  const auth = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        auth.register(values);
      }
    });
  };

  useEffect(() => {
    if (!isEmpty(auth.user.payload)) {
      onLoginSuccess();
    }
  }, [auth.user.payload]);

  return (
    <Form onSubmit={handleSubmit}>
      {auth.user.error && (
        <Form.Item>
          <Alert
            message="Login error"
            type="error"
            description={auth.user.error}
          />
        </Form.Item>
      )}
      <Form.Item>
        {form.getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('password', {
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
        {form.getFieldDecorator('firstname', {
          rules: [{ required: true, message: 'Please input your first name!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Firstname"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('lastname')(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Lastname"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('avatar', {
          rules: [{ type: 'url', message: 'Should be url-link to avatar' }],
        })(
          <Input
            prefix={
              <Icon type="file-image" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Avatar link"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export const RegisterForm = Form.create({ name: 'register_form' })(Register);

Register.propTypes = {
  onLoginSuccess: PropTypes.func,
  form: PropTypes.object.isRequired,
};
