import React from 'react';
import { render, screen } from '@testing-library/react';
import Poll from './components/Poll';

test('renders Collaborative Polls heading', () => {
    render(<Poll />);
    const headingElement = screen.getByText(/Collaborative Polls/i);
    expect(headingElement).toBeInTheDocument();
});