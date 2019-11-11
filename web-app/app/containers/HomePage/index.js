/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PageHeader } from 'antd';

import messages from './messages';

export default function HomePage() {
  return (
    <PageHeader
      title="Home page"
      subTitle="Posts should be here"
      backIcon="false"
    >
      <FormattedMessage {...messages.header} />
    </PageHeader>
  );
}
