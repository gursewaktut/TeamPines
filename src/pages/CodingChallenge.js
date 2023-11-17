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
    'cpp': 'cpp',
    // Add other mappings as necessary
  };

  const comments = {python: "#Type your code here", javascript: "//Type your code here", cpp:  "//Type your code here" }

  const handleChange = (newCode) => {
    setCode(newCode);
  };

  // Function to handle changes in language selection
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(comments[event.target.value]);
  };

  // Function to handle changes in theme selection
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };


  useEffect(() => {
    async function loadQuestion() {
      const questionData = await fetchQuestion(); // Fetch the initial question
      setQuestion(questionData);
    }

    loadQuestion();
  }, []);


  const addLineBreak = (str: string) =>
    str.split('\n').map((subStr) => {
      return (
        <>
          {subStr}
          <br />
        </>
      );
    });




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
        console.log(data.error);
        const consiseError = data.error.split(',').pop().replace(/ /g, "\u00A0");
        console.log(consiseError);

        //const consiseError = data.error.split('\n').slice(-2).join('\n');
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

    {%    <Box p={4} w={"50%"}>                                                    %}
    {%      <Text color="green">{output.result || 'Output will appear here...'}</Text>%}
    {%      {output.error && <Text color="red">{addLineBreak(output.error)}</Text>}%}
    {%    </Box>                                                                   %}
    {%  </Flex>                                                                    %}
    {%  <Box display="flex" mt={4}>                                                %}
    {%    <Button onClick={checkCode} colorScheme="blue">Check Code</Button>       %}
    {%    <Button onClick={onToggleAnswer} ml={4}>Answer</Button>                  %}
    {%    <Button onClick={onToggleExplanation} ml={4}>Visual Explanation</Button> %}
    <Box p={4} w="50%" h="100%" style={{ backgroundColor: '#1F1717', position: 'relative'}}>
      <Text color="#FCF5ED"
        fontSize="36px"
        fontFamily="Abhaya Libre Medium"
        fontWeight="500"
        wordWrap="break-word" 
        position="absolute" left="824px" top="54px"
        mb={4}>{question.text || 'Loading question...'}</Text>

      <Box
        position="relative"
        width="50%"
        height="70%"
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
