import React, { useState, useEffect } from 'react';
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
import Steamship from "@steamship/client"
import { fetchQuestion, checkAnswer } from '../api/steamShip_client'; // Mock functions to represent API calls.

const CodingChallenge = () => {
  const [code, setCode] = useState('// Type your code here');
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [question, setQuestion] = useState({});
  const { isOpen: isAnswerOpen, onToggle: onToggleAnswer } = useDisclosure();
  const { isOpen: isExplanationOpen, onToggle: onToggleExplanation } = useDisclosure();

  useEffect(() => {
    async function loadQuestion() {
      const questionData = await fetchQuestion(); // Fetch the initial question
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
    const result = await checkAnswer(code, language); // Assume checkAnswer also needs the language
    // Handle the result of the code check here
  };

  return (
    <Box p={4}>
      <Text mb={4} dangerouslySetInnerHTML={{ __html: question.text || 'Loading question...' }} />
      <CodeEditor
        code={code}
        onChange={handleChange}
        language={language}
        theme={theme}
        handleLanguageChange={handleLanguageChange}
        handleThemeChange={handleThemeChange}
      />
      <Box display="flex" mt={4}>
        <Button onClick={checkCode} colorScheme="blue">Check Code</Button>
        <Button onClick={onToggleAnswer} ml={4}>Answer</Button>
        <Button onClick={onToggleExplanation} ml={4}>Visual Explanation</Button>
      </Box>

      {isAnswerOpen && <Text mt={4}>{question.answer}</Text>}
      {isExplanationOpen && <Box>{/* Render visual explanation here */}</Box>}

      {/* Include the "Tutor Mode" chatbot interface */}
      {/* This will be a separate component to include here*/}
    </Box>
  );
};

export default CodingChallenge;
