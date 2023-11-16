import React, { useState, useEffect } from 'react';
import { Flex, Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
import Steamship from "@steamship/client"
import { fetchQuestion, checkAnswer } from '../api/steamShip_client'; // Mock functions to represent API calls.
import { HACKEREARTH_URL as hackerEarthUrl, HACKER_EARTH_KEY as hackerearthKey } from '../constants.js'

const CodingChallenge = () => {
  const [code, setCode] = useState('# Type your code here');
  const [output, setOutput] = useState({});
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [question, setQuestion] = useState({});
  const { isOpen: isAnswerOpen, onToggle: onToggleAnswer } = useDisclosure();
  const { isOpen: isExplanationOpen, onToggle: onToggleExplanation } = useDisclosure();
  const {checkOutput, setCheckOutput} = useState('false');

  const comments = {python: "#Type your code here", javascript: "//Type your code here", html: "<!-- Type your code here -->" }


  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("client-secret", `${hackerearthKey}`);


//  const requestBody = JSON.stringify({
//    "lang": `${language}`,
//    "source": `${code}`,
//    "input": "",
//    "memory_limit": 243232,
//    "time_limit": 5,
//    "context": {id: 213121},
//    //"callback": "https://client.com/callback/"
//  });
  useEffect(() => {
    async function loadQuestion() {
      const questionData = await fetchQuestion(); // Fetch the initial question
      setQuestion(questionData);
    }
    
    loadQuestion();
  }, []);

  useEffect((checkOutput) => {
    function getOutput() {
      if (checkOutput) {
        console.log('output called');
      }
    }
    getOutput()
    const interval = setInterval(() => getOutput(), 3000)
    return () => {
      clearInterval(interval);
    }
  }, []);


  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(comments[event.target.value]);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleChange = (newValue) => {
    setCode(newValue);
  };

  const checkCode = async () => {
    //const apiKey = process.env.API_KEY;
    //console.log(apiKey);
    //const result = await checkAnswer(code, language); // Assume checkAnswer also needs the language
    // Handle the result of the code check here
    const result = await fetch(hackerEarthUrl, {
      method: 'POST',
      headers: requestHeaders,
      body:JSON.stringify({
        "lang": `${language}`,
        "source": `${code}`,
        "input": "",
        "memory_limit": 243232,
        "time_limit": 5,
        "context": {id: 213121},
        //"callback": "https://client.com/callback/"
      })
    });

    setOutput(result.json());
    //.then(result => setOutput(result.compile_status))
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
          <Text>{output.result || 'Ouput..'}</Text>
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
