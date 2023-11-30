// CodingChallenge.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodingChallenge from '../../pages/CodingChallenge'; // Adjust the import path as necessary


describe('CodingChallenge', () => {
  it('renders the component and finds the Check Code button', () => {
    render(<CodingChallenge />);
    
    // Check if the button text is in the document
    const checkCodeButton = screen.getByText('Check Code');
    expect(checkCodeButton).toBeInTheDocument();
  });
});

describe('CodingChallenge', () => {
  it('Checks if Tutor mode comes on', () => {
    render(<CodingChallenge />);

    // Check if the button text is in the document
    const tutorModeButton = screen.getByText('Tutor Mode');
    //expect(tutorModeButton).toBeInTheDocument();
    fireEvent.click(tutorModeButton);
    expect(screen.getByText('Tutor Mode ON')).toBeInTheDocument();
  });
});

describe('CodingChallenge', () => {
  it('Checks if Tutor mode comes off', async () => {
    render(<CodingChallenge />);

    const tutorModeButton = screen.getByText(/Tutor Mode/i);
    fireEvent.click(tutorModeButton); //Click once to turn on
    fireEvent.click(tutorModeButton); //Click twice to turn off

    await waitFor(() => {
      expect(screen.getByText(/Tutor Mode(?! ON)/i)).toBeInTheDocument(); // Update the text to match the content of the Answer section
    });
  });
});

describe('CodingChallenge', () => {
  it('Opens the answer on clicking the Answer button', async () => {
    render(<CodingChallenge />);

    const answerButton = screen.getByText(/Answer/i);

    fireEvent.click(answerButton);

    await waitFor(() => {
      expect(screen.getByText(/Given the head of a singly linked list/i)).toBeInTheDocument(); // Update the text to match the content of the Answer section
    });
  });
});
