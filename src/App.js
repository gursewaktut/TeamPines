import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import LandingPage from './pages/LandingPage';
import CourseSelection from './pages/CourseSelection';
import CodingChallenge from './pages/CodingChallenge';
import TutorMode from './pages/TutorMode';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/courses" component={CourseSelection} />
          <Route path="/challenge/:language" component={CodingChallenge} />
          <Route path="/tutor-mode" component={TutorMode} />
          {/* Add other routes as needed */}
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
