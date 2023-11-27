import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Box
      className="root"
      position="relative"
      width="100%" 
      height="100vh" 
      alignItems="flex-start"
      backgroundColor="#1f1717"
      overflow="hidden"
      boxShadow="0px 4px 4px 0px #00000040"
      textAlign="center"
      justifyContent="center"
    >
      <Image
        src="https://gifdb.com/images/high/animated-chock-coding-c78f6elj32sfoi8q.gif"
        alt="Coding GIF"
        w="50%" 
        style={{ position: 'absolute', left: '25%', top: '5%' }} 
      />
      <Text
        fontSize="4vw" 
        color="#FCF5ED"
        fontFamily="Black Han Sans"
        fontWeight="400"
        wordBreak="break-word"
        mt="5%"
      >
        CodeMentor AI
      </Text>

      <Text
        fontSize="3.5vw" 
        color="#ce5a67"
        fontFamily="Roboto Mono"
        position="absolute"
        left="50%"
        bottom="30vh"
        transform="translateX(-50%)"
        whiteSpace="nowrap"
      >
        Start Your Coding Journey
      </Text>
      <Text
        fontSize="2.5vw"
        color="#fcf5ed"
        fontFamily="Roboto Mono"
        position="absolute"
        left="50%"
        bottom="25vh"
        transform="translateX(-50%)"
        whiteSpace="nowrap"
      >
        Explore and Master the World of Programming
      </Text>
      <VStack spacing="1rem" position="absolute" bottom="10vh" left="50%" transform="translateX(-50%)">
        <Button as={Link} to="/courses" color="#CE5A67" size="lg" bg="#F4BF96" fontFamily="Roboto Mono"> 
          Get Started
        </Button>
        <Button color="white" variant="outline" size="lg" isDisabled fontFamily="Roboto Mono">
          I Already Have an Account
        </Button>
      </VStack>
    </Box>
  );
}
