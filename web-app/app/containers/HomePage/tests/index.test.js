import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HomePage from '../index';

const renderer = new ShallowRenderer();

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<HomePage />);
    const renderedOutput = renderer.getRenderOutput();

    expect(renderedOutput).toMatchSnapshot();
  });
});
