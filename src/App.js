import React from 'react';
import { createBrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import LandingPage from './pages/LandingPage';
import CourseSelection from './pages/CourseSelection';
import CodingChallenge from './pages/CodingChallenge';
import TutorMode from './pages/TutorMode';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/courses" element={<CourseSelection/>} />
          <Route path="/challenge/:language" element={<CodingChallenge/>} />
          <Route path="/tutor-mode" element={<TutorMode/>} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
