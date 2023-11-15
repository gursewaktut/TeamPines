import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <VStack spacing={4} align="center" justify="center" h="100vh">
      <Image src="/images/character_image.png" alt="CodeMentor AI" boxSize="150px" />
      <Text fontSize="4xl" fontWeight="bold">CodeMentor AI</Text>
      <Text fontSize="md">Start Your Coding Journey</Text>
      <Text fontSize="md">Explore and Master the World of Programming</Text>
      <Button as={Link} to="/courses" colorScheme="teal" size="lg">
        Get Started
      </Button>
      {/* If the "I Already Have an Account" button is not supposed to be functional, 
          you can disable it or remove it. Here's how to disable it: */}
      <Button variant="outline" size="lg" isDisabled>
        I Already Have an Account
      </Button>
    </VStack>
  );
}
