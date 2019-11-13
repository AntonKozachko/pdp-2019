import React from 'react';
import { PageHeader } from 'antd';

import { UserBar } from '../UserBar/user-bar';

export default function Header() {
  return (
    <PageHeader
      title="Home page"
      backIcon="false"
      extra={[<UserBar key="1" />]}
    />
  );
}
