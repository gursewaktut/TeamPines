// src/pages/TutorMode.js
import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { sendMessageToSteamship } from '../api/steamShip_client.js'; // Mock function to represent sending messages to Steamship API.
import { addLineBreak } from '../helpers/functions.js';

const TutorMode = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      // Add the message to the chat display
      setMessages([...messages, { type: 'user', text: trimmedMessage }]);
      setMessage('');

      // Send the message to the Steamship API and wait for the response
      const response = await sendMessageToSteamship(trimmedMessage);

      console.log(addLineBreak(response));
      // Add the Steamship response to the chat display
      //console.log(response.json());
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: response}]);
    }
  };

  // Automatically scroll to the bottom of the chat when new messages are added
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <VStack spacing={4}>
      <Box as="header" p={4}>
        {/* Tutor Mode Header */}
        <Text fontSize="2xl" fontWeight="bold">Tutor Mode</Text>
      </Box>
      <VStack as="section" w="100%" h="80vh" overflowY="auto" p={4} spacing={4} bg="gray.50">
        {messages.map((msg, index) => (
          <Box key={index} alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}>
            <Text
              bg={msg.type === 'user' ? 'blue.500' : 'green.500'}
              color="white"
              p={2}
              borderRadius="md"
            >
              <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
            </Text>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </VStack>
      <Box as="footer" p={4}>
        <Input
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button colorScheme="blue" onClick={sendMessage} mt={2}>
          Send
        </Button>
      </Box>
    </VStack>
  );
};

export default TutorMode;
