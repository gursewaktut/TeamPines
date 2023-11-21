import React, { useState, useEffect } from 'react';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
import { fetchQuestion, checkAnswer } from '../api/steamShip_client';

const CodingChallenge = () => {
  const [code, setCode] = useState('// Type your code here');
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [question, setQuestion] = useState({});
  const { isOpen: isAnswerOpen, onToggle: onToggleAnswer } = useDisclosure();
  const { isOpen: isExplanationOpen, onToggle: onToggleExplanation } = useDisclosure();
  const { isOpen: isTutorModeOpen, onToggle: onToggleTutorMode} = useDisclosure();
  const [isTutorModeActive, setIsTutorModeActive] = useState(false); // New state for tutor mode
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat window


  useEffect(() => {
    async function loadQuestion() {
      const questionData = await fetchQuestion();
      setQuestion(questionData);
    }
    
    loadQuestion();
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleChange = (newValue) => {
    setCode(newValue);
  };

  const checkCode = async () => {
    const result = await checkAnswer(code, language);
    // Handle the result of the code check here
  };
  const handleTutorModeToggle = () => {
    setIsTutorModeActive(!isTutorModeActive); // Toggle tutor mode state
    // Perform any additional actions related to toggling tutor mode

    // Open chat window when entering tutor mode
    if (!isChatOpen && isTutorModeActive) {
      setIsChatOpen(true);
      // Any additional logic for chat opening
    }
  };

  const containerStyles = {
    backgroundColor: '#1f1717', // Background color for the entire interface
    minHeight: '100vh',
    position: 'relative',
  };

  // Dynamic styles for CodeEditor positioning
  const codeEditorStyles = {
    position: 'absolute',
    left: '72%', // Adjust left positioning dynamically
    top: '32%', // Adjust top positioning dynamically
    transform: 'translate(-50%, -50%)',
    width: '50%', // Adjust width dynamically
    height: '60%', // Adjust height dynamically
  };

  const checkCodeStyle = {
    position: 'absolute',
    left: '90%', // Adjust left positioning dynamically
    top: '95%', // Adjust top positioning dynamically
    transform: 'translate(-50%, -50%)',
    width: '5%', // Adjust width dynamically
    height: '5%', // Adjust height dynamically
    
  }

  const questionStyle = {
    position: 'absolute',
    left: '12%', // Adjust left positioning dynamically
    top: '15%', // Adjust top positioning dynamically
    transform: 'translate(-50%, -50%)',
    width: '20%', // Adjust width dynamically
    height: '5%', 
    color: "#FCF5ED"
  }
  return (
    <Box p={4} style={containerStyles} display="flex" justifyContent="space-between" minHeight="100vh" position="relative">
      <Box style = {questionStyle} flex={1} display="flex" flexDirection="column">
        <Text mb={4}>{question.text || 'Loading question...'} </Text>
        </Box>
        <Box style={codeEditorStyles}>
          <CodeEditor
            code={code}
            onChange={handleChange}
            language={language}
            theme={theme}
            handleLanguageChange={handleLanguageChange}
            handleThemeChange={handleThemeChange}
          />
        </Box> 
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Box style={checkCodeStyle}  >
          <Button onClick={checkCode} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED' }}>Check Code</Button>
          </Box>
          <Button onClick={onToggleAnswer} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED' }} >Answer</Button>
          <Button onClick={onToggleExplanation} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED' }} >Visual Explanation</Button>
          {isTutorModeActive && isChatOpen && (

            <Box
            style={{
              position: 'absolute',
              left: '20px',
              bottom: '20px', // Adjust the initial bottom position for the chat window
              width: '28%',
              height: '40%',
              backgroundColor: '#1F1F1F',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '1%',
              
            }}
            >
              {/* Chat content */}
              {/* Replace this with your chat content */}
              <Text fontSize="xl" fontWeight="bold" mb={6} color="#FCF5ED" >TUTOR MODE ON</Text>
            </Box>
          )}
          {/* Button section */}
          <Box display="flex" justifyContent="flex-end">
            {/* Existing buttons */}
            <Button onClick={handleTutorModeToggle} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED' }}>
              {isTutorModeActive ? 'Exit Tutor Mode' : 'Tutor Mode'}
            </Button>
          </Box>

        </Box>
      </Box>
  );
};

export default CodingChallenge;
