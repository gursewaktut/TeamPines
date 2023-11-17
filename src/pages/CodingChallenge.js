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
    <Box p={4} style={{ backgroundColor: '#1F1717', position: 'relative', height: "982px", width: "1512px"}}>
      <Text color="#FCF5ED"
      fontSize="36px"
      fontFamily="Abhaya Libre Medium"
      fontWeight="500"
      wordWrap="break-word" 
      position="absolute" left="824px" top="54px"
      mb={4}>{question.text || 'Loading question...'}</Text>
      
      <Box
        position="absolute"
        left="805px"
        top="136px"
        width="682px"
        height="723px"
      >
        <CodeEditor
          code={code}
          onChange={handleChange}
          language={language}
          theme={theme}
          handleLanguageChange={handleLanguageChange}
          handleThemeChange={handleThemeChange}
        />
      </Box>

      <Box display="flex" mt={4} w="100%">
      <Box flex="1" mr={4}>
        <Button
          onClick={onToggleAnswer}
          bg="#CE5A67"
          color="#FCF5ED"
          w="324px"
          h="78px"
          fontSize="36px"
          fontFamily="Abhaya Libre Medium"
          position="absolute"
        left="30px"
        top="32px"
        borderRadius="30px"
        >
          Answer
        </Button>
      </Box>
      <Box flex="1">
        <Button
          onClick={onToggleExplanation}
          bg="#CE5A67"
          color="#FCF5ED"
          w="324px"
          h="78px"
          fontSize="36px"
          fontFamily="Abhaya Libre Medium"
          position="absolute"
        left="390px"
        top="32px"
        borderRadius="30px"
        >
          Visual Explanation
        </Button>
      </Box>
      <Box flex="1">
        <Button
          onClick={checkCode}
          bg="#CE5A67"
          color="#FCF5ED"
          w="324px"
          h="78px"
          fontSize="36px"
          fontFamily="Abhaya Libre Medium"
          position="absolute"
        left="1136px"
        top="859px"
        borderRadius="30px"
        >
          Check Code
        </Button>
      </Box>
    </Box>

<Box display="flex" mt={4} position="relative">
      {isAnswerOpen && <Text mt={4}>{question.answer}</Text>}
      {isExplanationOpen && <Box>{/* Render visual explanation here */}</Box>}

      <Box width="777px" height="0" background="#FCF5ED" border="3px #FCF5ED solid" position="absolute" left="0" top="100px"/>
      <Box height="982.09px" width="0" background="#FCF5ED" border="3px #FCF5ED solid" position="absolute" left="777" top="-72px"/>
    </Box>
    </Box>
  );
};

export default CodingChallenge;