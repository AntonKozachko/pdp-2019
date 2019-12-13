import React, { useState } from 'react';
import { Modal, Button, Dropdown, Menu, Icon, Avatar } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { LoginForm } from '../Auth/login';
import { RegisterForm } from '../Auth/register';
import { useAuth } from '../AuthProvider/use-auth';
import { modalTypes } from './constants/modal-types';

import './user-styles.css';

export const UserBar = () => {
  const [modal, setModalState] = useState({
    isOpen: false,
    type: modalTypes.login,
  });
  const auth = useAuth();

  const openLoginModal = () => {
    setModalState({ ...modal, type: modalTypes.login, isOpen: true });
  };

  const closeLoginModal = () => {
    setModalState({ ...modal, isOpen: false });
  };

  const openRegisterModal = () => {
    setModalState({ ...modal, type: modalTypes.register, isOpen: true });
  };

  const renderUserMenu = () => (
    <Menu>
      <Menu.Item>
        <Icon type="logout" />
        {/* eslint-disable-next-line */}
        <span onClick={auth.logout}>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user">
      {auth.user.payload ? (
        <div className="user-info">
          <Avatar src={auth.user.payload.avatar}>
            {isEmpty(auth.user.payload.avatar) && auth.user.payload.firstname}
          </Avatar>
          <Dropdown trigger={['hover', 'click']} overlay={renderUserMenu()}>
            <div className="user-info__firstname">
              {auth.user.payload.firstname}
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className="auth-actions">
          <Button icon="login" type="primary" onClick={openLoginModal}>
            Login
          </Button>
          <Button type="secondary" onClick={openRegisterModal}>
            Register
          </Button>
        </div>
      )}
      <Modal
        title={`${
          modal.type === modalTypes.login ? 'Login' : 'Register'
        } user with credentials`}
        visible={modal.isOpen}
        onCancel={closeLoginModal}
        footer={null}
        destroyOnClose
        centered
      >
        {modal.type === modalTypes.login ? (
          <LoginForm onLoginSuccess={closeLoginModal} />
        ) : (
          <RegisterForm onLoginSuccess={closeLoginModal} />
        )}
      </Modal>
    </div>
  );
};
