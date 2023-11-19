import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Flex, Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
// import Steamship from "@steamship/client"
import { fetchQuestion, checkAnswer } from '../api/steamShip_client'; // Mock functions to represent API calls.


const CodingChallenge = () => {
  const [code, setCode] = useState('# Type your code here');
  const [output, setOutput] = useState({result: "Output will be here...."});
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


  const addLineBreak = (str) =>
  str.split('\n').map((subStr, index) => (
    <React.Fragment key={index}>
      {subStr}
      <br />
    </React.Fragment>
  ));





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
    <Box style={{ backgroundColor: '#1F1717', position: 'relative', height: "982px", width: "100%"}} p={4}>
      {/*}<Text mb={4}>{question.text || 'Loading question...'}</Text>*/}
      <Grid w="100%"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}>
        <GridItem p={4} border="1px" borderColor="white" borderRadius="md" rowSpan={1} colSpan={1} >
          <CodeEditor
            code={code}
            onChange={handleChange}
            language={language}
            theme={theme}
            handleLanguageChange={handleLanguageChange}
            handleThemeChange={handleThemeChange}
          />
        </GridItem>

        <GridItem p={4} border="1px" borderColor="white" borderRadius="md"w="90%" rowSpan={1} colSpan={1}>
          <Text color="green">{addLineBreak(output.result) || 'Output will appear here...'}</Text>
          {output.error && <Text color="red">{addLineBreak(output.error)}</Text>}
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button bg="#CE5A67" color="#FCF5ED" onClick={checkCode} colorScheme="blue">Check Code</Button>
          <Button bg="#CE5A67" color="#FCF5ED" onClick={onToggleAnswer} ml={4}>Answer</Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button bg="#CE5A67" color="#FCF5ED" onClick={onToggleExplanation} ml={4}>Visual Explanation</Button>
        </GridItem>
      </Grid>


      {isAnswerOpen && <Text mt={4}>{question.answer}</Text>}
      {isExplanationOpen && <Box>{/* Render visual explanation here */}</Box>}

      {/* Include the "Tutor Mode" chatbot interface */}
      {/* This will be a separate component to include here*/}
    </Box>
  );
};

export default CodingChallenge;
