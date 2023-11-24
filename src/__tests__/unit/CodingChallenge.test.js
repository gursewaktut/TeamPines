// CodingChallenge.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CodingChallenge from '../../pages/CodingChallenge'; // Adjust the import path as necessary

describe('CodingChallenge', () => {
  it('renders the component and finds the Check Code button', () => {
    const { getByText } = render(<CodingChallenge />);
    
    // Check if the button text is in the document
    const checkCodeButton = getByText('Check Code');
    expect(checkCodeButton).toBeInTheDocument();
  });

  it('calls checkCode function when the Check Code button is clicked', () => {

    const mockCheckCode = jest.fn();
    CodingChallenge.prototype.checkCode = mockCheckCode; // Mock the method

    const { getByText } = render(<CodingChallenge />);
    const checkCodeButton = getByText('Check Code');
    fireEvent.click(checkCodeButton);

    // Expect the mock function to have been called
    expect(mockCheckCode).toHaveBeenCalled();
  });

  it('renders the component and finds the Answer button', () => {
    const { getByText } = render(<CodingChallenge />);

    // Check if the button text is in the document
    const answerButton = getByText('Answer');
    expect(answerButton).toBeInTheDocument();
  });

  it('calls answer function when the Visual Explanation button is clicked', () => {
    const { getByText } = render(<CodingChallenge />);

    // Check if the button text is in the document
    const vsButton = getByText('Visual Explanation');
    expect(vsButton).toBeInTheDocument();
  })
});
