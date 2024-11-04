import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('renders welcome message', () => {
  act(() => {
    render(<App />);
  });
  const welcomeElement = screen.getByText(/Welcome to CollabCast/i);
  expect(welcomeElement).toBeInTheDocument();
});
