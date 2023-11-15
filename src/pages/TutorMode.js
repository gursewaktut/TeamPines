// src/pages/TutorMode.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
//import { sendMessageToSteamship } from '../api'; // Mock function to represent sending messages to Steamship API.

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
      //const response = await sendMessageToSteamship(trimmedMessage);
      
      // Add the Steamship response to the chat display
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: 'response' }]);
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
              {msg.text}
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