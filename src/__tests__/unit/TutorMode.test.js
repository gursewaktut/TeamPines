// TutorMode.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import TutorMode from '../../pages/TutorMode'; // Adjust the import path as necessary

describe('TutorMode Component', () => {
  it('renders without crashing', () => {
    render(<TutorMode />);
    const headerText = screen.getByText('Tutor Mode');
    expect(headerText).toBeInTheDocument();
  });
});
