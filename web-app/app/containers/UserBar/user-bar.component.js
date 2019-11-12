import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider/use-auth';

export const UserBar = () => {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth);
  });

  function loginHandler () {
    auth.login('test_user', 'test');
  }

  return (
    <div>
      <button
        onClick={loginHandler}
      >
        Login
      </button>
      <div>
        {
          JSON.stringify(auth.user)
        }
      </div>
    </div>
  );
}