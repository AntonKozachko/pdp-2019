import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export default function HomePage() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}
