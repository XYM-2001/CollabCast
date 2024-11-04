import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Poll from './components/Poll';

test('renders Collaborative Polls heading', () => {
    act(() => {
        render(<Poll />);
    });
    const headingElement = screen.getByText(/Collaborative Polls/i);
    expect(headingElement).toBeInTheDocument();
});