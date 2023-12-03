import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TutorMode from '../../pages/TutorMode.js';
import * as steamShipClient from '../../api/steamShip_client.js'; // Import everything under a single namespace
import CodingChallenge from '../../pages/CodingChallenge.js';

jest.mock('../../api/steamShip_client.js'); // Mock the API module
window.HTMLElement.prototype.scrollIntoView = jest.fn(); //jest is weird about scrollview so I mocked it here 

describe('Tutor Mode', () => {
  it('allows user to send messages and displays responses', async () => {
    steamShipClient.sendMessageToSteamship.mockResolvedValue('Response from tutor'); // Mock the API response

    render(<TutorMode />);

    // Find the message input field and the send button
    const messageInput = screen.getByPlaceholderText('Type your message here...');
    const sendMessageButton = screen.getByRole('button', { name: 'Send' });

    // Simulate user typing a message and clicking the send button
    fireEvent.change(messageInput, { target: { value: 'Hello, tutor!' } });
    fireEvent.click(sendMessageButton);

    // Verify the sent message and the tutor's response are displayed
    await waitFor(() => {
      expect(screen.getByText('Hello, tutor!')).toBeInTheDocument();
      expect(screen.getByText('Response from tutor')).toBeInTheDocument();
    });
  });
});

// Increase timeout for the test
jest.setTimeout(10000); // or any appropriate value

describe('Answer Bot in CodingChallenge', () => {
  it('fetches and displays the answer when the Answer button is clicked', async () => {
    steamShipClient.sendMessageToSteamship.mockResolvedValue('The correct answer is...'); // Ensure this mock is set up correctly

    render(<CodingChallenge />);

    // Find and click the Answer button
    const answerButton = screen.getByRole('button', { name: /Answer/i });
    fireEvent.click(answerButton);

    // Verify the fetched answer is displayed
    await waitFor(() => {
      const answerDisplay = screen.getByTestId('answer-visual-display');
      expect(answerDisplay).toHaveTextContent('The correct answer is...');
    });
  });
});


describe('Visual Explanation in CodingChallenge', () => {
  it('fetches and displays a visual explanation when the Visual Explanation button is clicked', async () => {
    steamShipClient.sendMessageToVisual.mockResolvedValue('Loading Visual Explanation....'); // Ensure this mock is set up correctly

    render(<CodingChallenge />);

    // Find and click the Visual Explanation button
    const visualExplanationButton = screen.getByRole('button', { name: /Visual Explanation/i });
    fireEvent.click(visualExplanationButton);

    // Verify that the fetched visual explanation is displayed
    await waitFor(() => {
      const visualExplanationDisplay = screen.getByTestId('answer-visual-display');
      expect(visualExplanationDisplay).toHaveTextContent('Loading Visual Explanation....');
    });
  });
});
