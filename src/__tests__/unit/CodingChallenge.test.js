// CodingChallenge.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodingChallenge from '../../pages/CodingChallenge'; 
import CodeEditor from '../../components/CodeEditor';


describe('CodingChallenge', () => {
  it('renders the component and finds the Check Code button', () => {
    render(<CodingChallenge />);
    
    // Check if the button text is in the document
    const checkCodeButton = screen.getByText('Check Code');
    expect(checkCodeButton).toBeInTheDocument();
  });
});

describe('CodingChallenge', () => {
  it('Checks that clicking the Tutor Mode button once opens the tutor mode', () => {
    render(<CodingChallenge />);

    // Check if the button text is in the document
    const tutorModeButton = screen.getByText('Tutor Mode');
    //expect(tutorModeButton).toBeInTheDocument();
    fireEvent.click(tutorModeButton);
    expect(screen.getByText('Tutor Mode ON')).toBeInTheDocument();
  });
});

describe('CodingChallenge', () => {
  it('Checks that clicking the Tutor Mode button twice closes the tutor mode after opening', async () => {
    render(<CodingChallenge />);

    const tutorModeButton = screen.getByText(/Tutor Mode/i);
    fireEvent.click(tutorModeButton); //Click once to turn on
    fireEvent.click(tutorModeButton); //Click twice to turn off

    await waitFor(() => {
      expect(screen.getByText(/Tutor Mode(?! ON)/i)).toBeInTheDocument(); 
    });
  });
});

describe('CodingChallenge', () => {
  it('Opens the answer on clicking the Answer button', async () => {
    render(<CodingChallenge />);

    const answerButton = screen.getByText(/Answer/i);

    fireEvent.click(answerButton);

    await waitFor(() => {
      expect(screen.getByText(/Given the head of a singly linked list/i)).toBeInTheDocument();
    });
  });
});

describe('CodingChallenge', () => {
  it('Checks if the Visual Explanation button works', async () => {
    render(<CodingChallenge />);

    const visualExplanationButton = screen.getByText(/Visual Explanation/i);

    await waitFor(() => {
      expect(visualExplanationButton).toBeInTheDocument();
    });
  });
});

describe('CodingChallenge', () => {
  it('Checks if the Next Question button works', async () => {
    render(<CodingChallenge />);

    const nextQuestionButton = screen.getByText(/Next Question/i);

    await waitFor(() => {
      expect(nextQuestionButton).toBeInTheDocument();
    });
  });
});


