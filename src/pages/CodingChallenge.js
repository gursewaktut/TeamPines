import React, { useRef, useState, useEffect } from 'react';
import { Input, VStack, Grid, GridItem, Box, Button, Text, useDisclosure, Center } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sendMessageToSteamship } from '../api/steamShip_client.js'; // Mock function to represent sending messages to Steamship API.
// import Steamship from "@steamship/client"
import { fetchQuestion, checkAnswer } from '../api/steamShip_client'; // Mock functions to represent API calls.
import { addLineBreak } from '../helpers/functions.js';

const CodingChallenge = () => {
  const [code, setCode] = useState('# Type your code here');
  const [output, setOutput] = useState({ result: "Output will be here...." });
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [question, setQuestion] = useState({});
  const { isOpen: isAnswerOpen, onToggle: onToggleAnswer } = useDisclosure();
  const { isOpen: isExplanationOpen, onToggle: onToggleExplanation } = useDisclosure();
  const { isOpen: isTutorModeOpen, onToggle: onToggleTutorMode } = useDisclosure();
  const [isTutorModeActive, setIsTutorModeActive] = useState(false); // New state for tutor mode
  const [isChatOpen, setIsChatOpen] = useState(true); // State for chat window
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [messageLoading, setMessageLoading] = useState(false);
  const [answer, setAnswer] = useState();

  const sendMessage = async () => {
    setMessageLoading(true);
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      // Add the message to the chat display
      setMessages([...messages, { type: 'user', text: trimmedMessage }]);
      setMessage('');

      // Send the message to the Steamship API and wait for the response
      const response = await sendMessageToSteamship(trimmedMessage);

      //setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: response}]);

      setMessages((prevMessages) => [...prevMessages, { loading: true, type: 'bot', text: response}]);
      setMessageLoading(false);
    }
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Language mapping for CodeX API
  const languageMap = {
    'python': 'py',
    'javascript': 'js',
    'cpp': 'cpp',
    // Add other mappings as necessary
  };

  const comments = { python: "#Type your code here", javascript: "//Type your code here", cpp: "//Type your code here" }

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


  const handleNextQuestion = async () => {
    const questionData = await fetchQuestion();
    setQuestion(questionData);
  };

  useEffect(() => {
    async function loadQuestion() {
      const questionData = await fetchQuestion();
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

      if (data.error) {
        //extracting relevant part of the error message
        console.log(data.error);
        const consiseError = data.error.split(',').pop().replace(/ /g, "\u00A0");
        console.log(consiseError);

        const codeExplanationMessage = `This is the question: ${question}, and this is the answer: ${code}.
Is the answer right. Just say yes or no.`
        const solutionBotResponse = sendMessageToSteamship(codeExplanationMessage);
        setAnswer(solutionBotResponse);
        solutionBotResponse.then(data => console.log(data));
        //const consiseError = data.error.split('\n').slice(-2).join('\n');
        setOutput({ result: data.output, error: consiseError });
        setShowErrorMessage(true);
      } else {
        const codeExplanationMessage = `This is the question: ${question}, and this is the answer: ${code}.
This is the execution result: ${data.output}. Is the answer right. Just say yes or no.`
        const solutionBotResponse = sendMessageToSteamship(codeExplanationMessage);
        setAnswer(solutionBotResponse);
        solutionBotResponse.then(data => console.log(data));
        setOutput({ result: data.output, error: '' });
        setShowErrorMessage(false);
      }
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput({ error: error.message });
      setShowErrorMessage(true);
    }
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

      <Box style={questionStyle} flex={1} display="flex" flexDirection="column">
        <Text mb={4}><Markdown>{question.text || 'Loading question...'}</Markdown> </Text>
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
        {showErrorMessage && (
          <Box
            style={{
              position: 'absolute',
              left: '50%', 
              bottom: '-95px',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#FCF5ED', // Red background for error message
              padding: '10px',
              borderRadius: '5px',
              zIndex: '999', // Ensure it's on top of other elements
            }}
          >
            <Text color="#ce5a67">{output.error}</Text>

          </Box>
        )}


      </Box>
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Box style={checkCodeStyle}  >
          <Button onClick={checkCode} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }}>Check Code</Button>
        </Box>
        <Button onClick={onToggleAnswer} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED' ,fontFamily: "Roboto Mono"}} >Answer</Button>
        <Button onClick={onToggleExplanation} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono"}} >Visual Explanation</Button>
        {isTutorModeActive && isChatOpen && (

          <Box
            style={{
              position: 'absolute',
              left: '20px',
              bottom: '20px', // Adjust the initial bottom position for the chat window
              width: '43%',
              height: '40%',
              backgroundColor: '#1F1F1F',
              borderRadius: '5px',
              border: '1px solid #ccc',
              padding: '1%',
              display: 'flex',
              //justifyContent: 'center',
              overflow: 'auto',

            }}
          >
            <Grid w="100%" templateRows='repeat(3, 1fr)'>
              <GridItem colSpan={1} rowSpan={1}>
                <Button
                  style={{ backgroundColor: '#ce5a67', color: '#FCF5ED' }}
                  size="md"
                  fontFamily="Roboto Mono"
                >
                  Tutor Mode ON
                </Button>
              </GridItem>
              <GridItem colSpan={1} rowSpan={1}>
                <VStack as="section" w="100%"  overflowY="auto" p={4} spacing={4} >
                  {messages.map((msg, index, array) => (
                    <Box key={index} borderRadius="md" px={4} bg={msg.type === 'user' ? 'blue.500' : 'green.500'} alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}>
                      <Text

                        color="white"
                        //p={2}
                        borderRadius="md"
                      >
                      <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>


                      </Text>
                    </Box>
                  ))}
                  {messageLoading ? <Box borderRadius="md" px={4} bg="green.500" alignSelf='flex-start'> <Text color="white" borderRadius="md">Thinking....</Text></Box> : "" }
                  <div ref={messagesEndRef} />
                </VStack>
              </GridItem>
              <GridItem colSpan={1} rowSpan={1}>
                <Box as="footer" p={4}>
                  <Input
                    placeholder="Type your message here..."
                    color="white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button colorScheme="blue" onClick={sendMessage} mt={2}>
                    Send
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        )}

        {/* Button section */}
        <Box display="flex" justifyContent="flex-end">
          {/* Existing buttons */}
          <Button onClick={handleTutorModeToggle} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }}>
            {isTutorModeActive ? 'Exit Tutor Mode' : 'Tutor Mode'}
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {/* Existing buttons */}
          <Button onClick={handleNextQuestion} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }}>
            Next Question
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CodingChallenge;
