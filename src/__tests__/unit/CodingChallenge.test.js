// CodingChallenge.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

