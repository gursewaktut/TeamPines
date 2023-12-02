import React, { useRef, useState, useEffect } from 'react';
import { Input, VStack, Grid, GridItem, Box, Button, Text, useDisclosure, Center } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sendMessageToSteamship, sendMessageToSteamshipTutor, sendMessageToVisual } from '../api/steamShip_client.js'; // Mock function to represent sending messages to Steamship API.
// import Steamship from "@steamship/client"
import { fetchQuestion, checkAnswer } from '../api/steamShip_client'; // Mock functions to represent API calls.
import { addLineBreak } from '../helpers/functions.js';

const CodingChallenge = () => {
  const [code, setCode] = useState('# Type your code here');
  const [index, setIndex] = useState(0);
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
  const [showOutput, setShowOutput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [messageLoading, setMessageLoading] = useState(false);
  const [answer, setAnswer] = useState({text: "Loading answer"});
  const [showAnswer, setShowAnswer] = useState(false);

  const sendMessage = async () => {
    setMessageLoading(true);
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      // Add the message to the chat display
      setMessages([...messages, { type: 'user', text: trimmedMessage }]);
      setMessage('');

      // Send the message to the Steamship API and wait for the response
      const prompt = `${trimmedMessage}, Question: ${question.text}`;
      console.log(prompt);
      const response = await sendMessageToSteamshipTutor(prompt);

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
    const questionData = await fetchQuestion(index);
    if (index === 9) {
      setIndex(0)
    } else {
      setIndex(index => index+1);
    }
    setQuestion(questionData);
  };

  const handleVisualExplanation = () => {
    setAnswer({text: "Loading Visual Explanation.... "})
    const prompt = `This is the question: ${question.text}, \n give me a Visual explanation for this question`;
    console.log(prompt);
    const response = sendMessageToVisual(prompt);
    response.then( data => setAnswer({text: data}) );
    //setAnswer({text: response});
    setShowAnswer(true);
  };

  useEffect(() => {
    async function loadQuestion() {
      //const questionData = await fetchQuestion();
      setIndex(0);
      const questionData = await fetchQuestion(index);
      setQuestion(questionData);
    }

    loadQuestion();
  }, []);

  const checkCode = async () => {
    console.log('checking code');
    setOutput({result: "Output will be here...."});
    setAnswer({text: "Checking answer...."});

    const CODEX_API_URL = 'https://codex-team-pines.onrender.com/';
    //const CODEX_API_URL = 'https://api.codex.jaagrav.in';
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('language', languageMap[language.toLowerCase()] || language.toLowerCase());
    params.append('input', ''); 

    try {
      const response = await fetch(CODEX_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      const data = await response.json();
      console.log("After execution");
      console.log(data);

      if (data.error) {

        console.log(data.error);
        const consiseError = data.error.split(',').pop().replace(/ /g, "\u00A0");
        console.log(consiseError);

        const codeExplanationMessage = `This is the question: \n ${question.text}, and this is the answer: \n ${code}.
        and here is the output \n ${data.error}`;
        console.log(codeExplanationMessage);
        const solutionBotResponse = sendMessageToVisual(codeExplanationMessage);
        //solutionBotResponse.then(data => console.log(data));
        solutionBotResponse.then(data => setAnswer({text: data}));
        //const solutionBotResponse = 'Your answer is correct';
        //setAnswer({text: solutionBotResponse});
        //setAnswer({text: "Your answer is incorrect"});
        //solutionBotResponse.then(data => console.log(data));
        //const consiseError = data.error.split('\n').slice(-2).join('\n');
        setOutput({ result: data.output, error: consiseError });
        setShowOutput(true);
        setShowAnswer(true);
      } else {
        //const codeExplanationMessage = `This is the question: ${question}, and this is the answer: ${code}.
        //This is the execution result: ${data.output}. Is the answer right. Just say yes or no.`
        //const solutionBotResponse = sendMessageToVisual(codeExplanationMessage);
        //setAnswer({text: "your answer is correct"});
        const codeExplanationMessage = `This is the question:\n ${question.text}, and this is the answer: \n ${code}.
        and here is the output \n ${data.error}`;
        console.log(codeExplanationMessage);
        const solutionBotResponse = sendMessageToVisual(codeExplanationMessage);
        solutionBotResponse.then(data => setAnswer({text: data}));
        //solutionBotResponse.then(data => console.log(data));
        //setAnswer({text: solutionBotResponse});
        //solutionBotResponse.then(data => console.log(data));
        setOutput({ result: data.output, error: '' });
        setShowOutput(true);
        setShowAnswer(true);
      }
    } catch (error) {
      //console.error('Error executing code:', error);
      //const codeExplanationMessage = `This is the question: ${question}, and this is the answer: ${code}.
      //This is the execution result: ${error}. Is the answer right. Just say yes or no.`
      //const solutionBotResponse = sendMessageToVisual(codeExplanationMessage);
      //setAnswer({text: solutionBotResponse});
      const codeExplanationMessage = `This is the question: \n ${question.text}, and this is the answer: \n ${code}.
        and here is the output \n ${error}`;
      const solutionBotResponse = sendMessageToVisual(codeExplanationMessage);
      console.log(codeExplanationMessage);
      solutionBotResponse.then(data => setAnswer({text: data}));
      //setAnswer({text: "Your answer is incorrect"});
      setOutput({ result: error.message, error: error.message });
      setShowOutput(true);
      setShowAnswer(true);
    }
  };

  const handleToggleOutput = () => {
    setShowOutput(!showOutput);
  };

  const handleToggleAnswer = () => {
    setAnswer({text: "Loading answer.... "})
    const prompt = `This is the question: ${question.text}, \n give me the solution to this using ${language}`;
    console.log(prompt);
    const response = sendMessageToSteamship(prompt);
    response.then( data => setAnswer({text: data}) );
    //setAnswer({text: response});
    setShowAnswer(true);
  };

  const handleTutorModeToggle = async () => {
    setIsTutorModeActive(!isTutorModeActive);
    if (!isChatOpen && isTutorModeActive) {
      setIsChatOpen(true);
    }
    //setMessageLoading(true);
    const trimmedMessage = `This is the question I am having trouble with ${question.text} please help me with it`;
    //setMessages([...messages, { type: 'user', text: trimmedMessage }]);
    //setMessage('');

    // Send the message to the Steamship API and wait for the response
    const response = await sendMessageToSteamshipTutor(trimmedMessage);

    //setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: response}]);

    //setMessages((prevMessages) => [...prevMessages, { loading: true, type: 'bot', text: response}]);
    //setMessageLoading(false);
  };

  const containerStyles = {
    backgroundColor: '#1f1717', 
    minHeight: '100vh',
    position: 'relative',
    padding: '1rem',
  };

  const codeEditorStyles = {
    position: 'absolute',
    left: '72%', 
    top: '32%', 
    transform: 'translate(-50%, -50%)',
    width: '50%', 
    height: '60%', 
  };

  const checkCodeStyle = {
    position: 'absolute',
    left: '90%', 
    top: '95%',
    transform: 'translate(-50%, -50%)',
    width: '5%', 
    height: '5%', 
    
  }

  const checkOutputStyle = {
    position: 'absolute',
    left: '80%', 
    top: '95%',
    transform: 'translate(-50%, -50%)',
    width: '5%', 
    height: '5%', 

  }

  const questionStyle = {
    position: 'absolute',
    left: '12%', 
    top: '15%', 
    transform: 'translate(-50%, -50%)',
    width: '20%', 
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
      </Box>


      {showOutput && output.error && (
        <Box
          style={{
            position: 'absolute',
            left: '72%', 
            top: '72%', 
            transform: 'translate(-50%, -50%)',
            width: '48%',
            height: '32%',
            backgroundColor: '#f5f5dc',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '1%',
            display: 'flex',
            justifyContent: 'start',
          }}
        >

          <Text color="red"><Markdown remarkPlugins={[remarkGfm]}>{output.error}</Markdown></Text>
        </Box>
      )}

      {showOutput && output.result && (
        <Box
          style={{
            position: 'absolute',
            right: '80px',
            bottom: '105px',
            width: '48%',
            height: '32%',
            backgroundColor: '#f5f5dc',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '1%',
            display: 'flex',
            justifyContent: 'start',
          }}
        >
          <Text color="green">{output.result}</Text>
        </Box>
      )}

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Box style={checkCodeStyle}  >
          <Button onClick={checkCode} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }}>Check Code</Button>
          </Box>
          <Box style={checkOutputStyle}>
          { !showOutput ?
            <Button onClick={handleToggleOutput} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }}>Open Output</Button>:
            <Button onClick={handleToggleOutput} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }}>Close Output</Button>
          }
          </Box>

        
        {showAnswer && (
          <Box
            style={{
              position: 'absolute',
              left: '20px',
              bottom: '20px',
              width: '43%',
              height: '40%',
              backgroundColor: '#f5f5dc',
              borderRadius: '5px',
              border: '1px solid #ccc',
              padding: '1%',
              display: 'flex',
              justifyContent: 'start',
              overflow: 'auto'
            }}
          >
            <Text fontSize="xl" mb="4" color="black" >
              <Markdown>{answer.text}</Markdown>
            </Text>
          </Box>
        )}

        <Button onClick={handleToggleAnswer} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }} >
          Answer
        </Button>
        <Button onClick={handleVisualExplanation} ml={4} style={{ backgroundColor: '#ce5a67', color: '#FCF5ED', fontFamily: "Roboto Mono" }} >Visual Explanation</Button>
        {isTutorModeActive && isChatOpen && (

          <Box
            style={{
              position: 'absolute',
              left: '20px',
              bottom: '20px',
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
                  onClick={handleTutorModeToggle}
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
                  {messageLoading ? <Box borderRadius="md" px={4} bg="red.500" alignSelf='flex-start'> <Text color="white" borderRadius="md">Thinking....</Text></Box> : "" }
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

        <Box display="flex" justifyContent="flex-end">

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
