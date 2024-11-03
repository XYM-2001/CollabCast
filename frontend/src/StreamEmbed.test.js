import React from 'react';
import { render, screen } from '@testing-library/react';
import StreamEmbed from './components/StreamEmbed';

test('renders Twitch stream iframe', () => {
    render(<StreamEmbed channel="test_channel" />);
    const iframeElement = screen.getByTitle('Twitch stream');
    expect(iframeElement).toBeInTheDocument();
});