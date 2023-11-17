import React, { useState, useEffect } from 'react';
import { Flex, Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
// import Steamship from "@steamship/client"
import { fetchQuestion, checkAnswer } from '../api/steamShip_client'; // Mock functions to represent API calls.


const CodingChallenge = () => {
  const [code, setCode] = useState('# Type your code here');
  const [output, setOutput] = useState({});
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [question, setQuestion] = useState({});
  const { isOpen: isAnswerOpen, onToggle: onToggleAnswer } = useDisclosure();
  const { isOpen: isExplanationOpen, onToggle: onToggleExplanation } = useDisclosure();

  // Language mapping for CodeX API
  const languageMap = {
    'python': 'py',
    'javascript': 'js',
    // Add other mappings as necessary
  };
  
  const comments = {python: "#Type your code here", javascript: "//Type your code here", html: "<!-- Type your code here -->" }

  const handleChange = (newCode) => {
    setCode(newCode);
  };

  // Function to handle changes in language selection
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Function to handle changes in theme selection
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  

  useEffect(() => {
    async function loadQuestion() {
      const questionData = await fetchQuestion(); // Fetch the initial question
      setQuestion(questionData);
    }
    
    loadQuestion();
  }, []);



const checkCode = async () => {
  console.log('checking code');

  const CODEX_API_URL = 'https://api.codex.jaagrav.in';
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('language', languageMap[language.toLowerCase()] || language.toLowerCase());
  params.append('input', ''); // Add any required input here

  try {
    const response = await fetch(CODEX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const data = await response.json();
    console.log(data);

    if (data.error){ 
    //extracting relevant part of the error message
    const consiseError = data.error.split('\n').slice(-2).join('\n');
    setOutput({ result: data.output, error: consiseError });
    } else {
      setOutput({result: data.output, error: ''});
    }
  } catch (error) {
    console.error('Error executing code:', error);
    setOutput({ error: error.message });
  }
};

 

  return (
    <Box p={4}>
      <Text mb={4}>{question.text || 'Loading question...'}</Text>
      <Flex >
        <Box p={4} w={"50%"}>
          <CodeEditor
            code={code}
            onChange={handleChange}
            language={language}
            theme={theme}
            handleLanguageChange={handleLanguageChange}
            handleThemeChange={handleThemeChange}
          />
        </Box>

        <Box p={4} w={"50%"}>
          <Text>{output.result || 'Output will appear here...'}</Text>
          {output.error && <Text color="red">{output.error}</Text>}
//to display the execution result
        </Box>
      </Flex>
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
