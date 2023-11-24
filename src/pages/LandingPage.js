import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Box
      className="root"
      position="relative"
      width="100%" // Set the width to 100% for responsiveness
      height="100vh" // Using full viewport height for the landing page
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
        w="50%" // Adjust the width as needed
        style={{ position: 'absolute', left: '25%', top: '5%' }} // Position relatively within the container
      />
      <Text
        fontSize="4vw" // Using viewport-based font size for responsive text
        color="#FCF5ED"
        fontFamily="Black Han Sans"
        fontWeight="400"
        wordBreak="break-word"
        mt="5%" // Adjust margin top as needed
      >
        CodeMentor AI
      </Text>

      <Text
        fontSize="3.5vw" // Using viewport-based font size for responsive text
        color="#ce5a67"
        fontFamily="Abhaya Libre Medium, sans-serif"
        position="absolute"
        left="50%"
        bottom="30vh" // Adjust position from the bottom as needed
        transform="translateX(-50%)"
        whiteSpace="nowrap"
      >
        Start Your Coding Journey
      </Text>
      <Text
        fontSize="2.5vw" // Using viewport-based font size for responsive text
        color="#fcf5ed"
        fontFamily="Abhaya Libre Medium, sans-serif"
        position="absolute"
        left="50%"
        bottom="25vh" // Adjust position from the bottom as needed
        transform="translateX(-50%)"
        whiteSpace="nowrap"
      >
        Explore and Master the World of Programming
      </Text>
      <VStack spacing="1rem" position="absolute" bottom="10vh" left="50%" transform="translateX(-50%)">
        <Button as={Link} to="/courses" color="#CE5A67" size="lg" bg="#F4BF96">
          Get Started
        </Button>
        <Button color="white" variant="outline" size="lg" isDisabled>
          I Already Have an Account
        </Button>
      </VStack>
    </Box>
  );
}
