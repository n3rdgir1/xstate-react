import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Select a subreddit');
  expect(linkElement).toBeInTheDocument();
});
