import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Box
      className="root"
      position="relative"
      width="100%" /* Considering the width from CSS */
      height="982px" /* Considering the height from CSS */
      alignItems="flex-start"
      backgroundColor="#1f1717"
      overflow="hidden"
      boxShadow="0px 4px 4px 0px #00000040"
      textAlign="center" /* To center align text */
      justifyContent="center" /* To center align items horizontally */
    >
      <Image
        src="https://gifdb.com/images/high/animated-chock-coding-c78f6elj32sfoi8q.gif"
        alt="Coding GIF"
        //w={} // width
        //h={518} // height
        style={{ position: 'absolute', left: 520, top: 50 }}
      />
      <Text
        w={360}
        color="#FCF5ED"
        fontSize={35}
        fontFamily="Black Han Sans"
        fontWeight="400"
        wordBreak="break-word"
      >
        CodeMentor AI
      </Text>

      <Text
        fontSize="45px" /* Matching the font size for 'startYourCodingJourney' */
        color="#ce5a67" /* Color for 'startYourCodingJourney' */
        fontFamily="Abhaya Libre Medium, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif"
        position="absolute"
        left="calc(50% - -2.5px)"
        top="619px"
        whiteSpace="nowrap"
        transform="translateX(-50%)"
      >
        Start Your Coding Journey
      </Text>
      <Text
        fontSize="32px" /* Matching the font size for 'exploreAndMasterTheWorldOfProg' */
        color="#fcf5ed" /* Color for 'exploreAndMasterTheWorldOfProg' */
        fontFamily="Abhaya Libre Medium, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif"
        position="absolute"
        left="50%"
        top="696px"
        whiteSpace="nowrap"
        transform="translateX(-50%)"
      >
        Explore and Master the World of Programming
      </Text>
      <VStack spacing="1rem" position="absolute" top="758px" left="50%" transform="translateX(-50%)">
        <Button id="getstarted" as={Link} to="/courses" color="#CE5A67" size="lg" bg="#F4BF96"  >
          Get Started
        </Button>
        <Button color="white" variant="outline" size="lg" isDisabled>
          I Already Have an Account
        </Button>
      </VStack>
    </Box>
  );
}

