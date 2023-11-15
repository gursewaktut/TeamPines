import React from 'react';
import { SimpleGrid, Box, Button, Image, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const courses = [
  { name: 'Python', icon: '/icons/python.png', path: '/challenge/python' },
  { name: 'C++', icon: '/icons/cpp.png', path: '/challenge/cpp' },
  { name: 'Java', icon: '/icons/java.png', path: '/challenge/java' },
  // ... other courses
];

export default function CourseSelection() {
  const history = useHistory();

  return (
    <Box textAlign="center" py={10}>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>Pick your Poison</Text>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
        {courses.map((course) => (
          <Button key={course.name} onClick={() => history.push(course.path)}>
            <Box textAlign="center">
              <Image src={course.icon} alt={course.name} boxSize="50px" mb={3} />
              <Text fontSize="xl">{course.name}</Text>
            </Box>
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
}
