import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Box
      className="root"
      position="relative"
      width="100%" 
      minHeight="100vh" // Changed height to minHeight for responsiveness
      backgroundColor="#1f1717"
      overflow="hidden"
      boxShadow="0px 4px 4px 0px #00000040"
      textAlign="center"
      justifyContent="center"
      px={{ base: '3rem', md: '5rem' }}
      display="flex"
      flexDirection="column"
    >
      <Box flexGrow="1">
        <Image
          src="https://gifdb.com/images/high/animated-chock-coding-c78f6elj32sfoi8q.gif"
          alt="Coding GIF"
          w={{ base: '80%', md: '50%' }} // Adjusted image width for responsiveness
          mx="auto" 
          my={{ base: '5%', md: '2%' }} // Adjusted margin for top and bottom space
        />
        <Text
          fontSize={{ base: '5vw', md: '42px' }} 
          color="#ce5a67"
          fontFamily="Roboto Mono"
          whiteSpace="nowrap"
          mb="2vh"
        >
          Start Your Coding Journey
        </Text>
        <Text
          fontSize={{ base: '4vw', md: '32px' }} 
          color="#fcf5ed"
          fontFamily="Roboto Mono"
          whiteSpace="nowrap"
          mb="4vh"
        >
          Explore and Master the World of Programming
        </Text>
      </Box>
      <VStack 
        spacing="1rem"
        width="90%" // Adjusted button width
        maxW="400px" // Set maximum width for responsiveness
        mx="auto"
      >
        <Button 
          as={Link} 
          to="/courses" 
          color="#CE5A67" 
          size="lg" 
          bg="#F4BF96" 
          fontFamily="Roboto Mono"
          width="80%" // Set width to 100%
        > 
          Get Started
        </Button>
        <Button 
          color="white" 
          variant="outline" 
          size="lg" 
          isDisabled 
          fontFamily="Roboto Mono"
          width= "80%" // Set width to 100%
        >
          I Already Have an Account
        </Button>
      </VStack>
    </Box>
  );
}


