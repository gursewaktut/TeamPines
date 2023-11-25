import React from 'react';
import { SimpleGrid, Box, Button, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const courses = [
  { name: 'Python', icon:'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', path: '/challenge/python' },
  { name: 'C++', icon: 'https://img.icons8.com/color/452/c-plus-plus-logo.png', path: '/challenge/cpp' },
  { name: 'Java', icon: 'https://cdn.iconscout.com/icon/free/png-512/java-43-569305.png', path: '/challenge/java' },
  { name: 'C', icon: 'https://img.icons8.com/color/452/c-programming.png', path: '/challenge/C' },
  { name: 'HTML', icon: 'https://cdn-icons-png.flaticon.com/512/919/919827.png', path: '/challenge/html' },
  { name: 'Swift', icon: 'https://cdn-icons-png.flaticon.com/512/732/732250.png', path: '/challenge/Swift' },
  { name: 'Javascript', icon: 'https://img.icons8.com/color/452/javascript.png', path: '/challenge/Javascript' },
  { name: 'Ruby', icon: 'https://img.icons8.com/color/452/ruby-programming-language.png', path: '/challenge/Ruby' },
  { name: 'CSS', icon: 'https://img.icons8.com/color/452/css3.png', path: '/challenge/CSS' },
  
  
  // ... other courses
];

const containerStyles = {
  backgroundColor: '#1f1717', // Background color for the entire interface
    minHeight: '100vh',
    position: 'relative',// Set the background color for the whole interface
};

export default function CourseSelection() {
  const navigate = useNavigate();

  return (
    <Box style={containerStyles}>
      <Box textAlign="center" px={50} py={50}>
        <Text fontSize="5xl" fontWeight="bold" mb={6} fontFamily="Roboto Mono" color="#FCF5ED" >CHOOSE A LANGUAGE</Text>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={10} >
          {courses.map((course) => (
            <Button
              key={course.name}
              onClick={() => navigate(course.path)}
              w="80%"
              h = "auto"
              p={0}
              bg="#ce5a67"
              border= '1px solid #ccc'
              style={{ margin: '20px 20px' }}
              _hover={{ bg: "#1F1F1F" }}
            >
              <Box textAlign="center">
                <Image src={course.icon} alt={course.name} boxSize="80px" />
                <Text fontSize="3xl" mt={2} color="#fcf5ed" fontFamily="Roboto Mono">
                  {course.name}
                </Text>
              </Box>
            </Button>

          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
