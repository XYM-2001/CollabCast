// frontend/src/Chat.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Chat from './components/Chat';

test('renders Unified Chat heading', () => {
    act(() => {
        render(<Chat />);
    });
    const headingElement = screen.getByText(/Unified Chat/i);
    expect(headingElement).toBeInTheDocument();
});