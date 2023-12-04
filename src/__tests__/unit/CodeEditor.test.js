import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeEditor from "../../components/CodeEditor";

describe('CodeEditor', () => {
    it('Checks the language selection dropdown', async () => {
      render(<CodeEditor />);
  
      const dropdown = screen.getByText('Python' || 'Javascript' || 'C++');
  
      await waitFor(() => {
        expect(dropdown).toBeInTheDocument();
      });
    });
  });