import React, { useState } from "react";
import './App.css';
import CodeEditor from './components/CodeEditor';
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Button } from "@chakra-ui/react"

import Steamship from "@steamship/client"


function App() {


  // store the state of code, language of choice and theme
  const [code, setCode] = useState('# enter code');
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('hc-black');


  // comments for each language
  const javaScriptComment = "// Enter Code here";
  const htmlComment = "<!-- Enter Code here -->";
  const pythonComment = "# Enter Code here";
  const handleThemeChange = (theme) => {
    setTheme(theme.target.value);

  }


  // handle the language selection by the user
  const handleLanguageChange = (newlanguage) => {
    setLanguage(newlanguage.target.value);
    switch(newlanguage.target.value){
    case "python": {
      setCode(pythonComment);
      break;
    }
    case "javascript": {
      setCode(javaScriptComment);
      break;
    }
    case "html": {
      setCode(htmlComment);
      break;
    }
    default: {
      setLanguage("python");
      setCode(pythonComment);
    }
    }
  }


  // steamship api call
  const url = "https://gursewaktut.steamship.run/teampines-t91i66/teampines"

  //const apiKey = "23A44372-4E75-4947-906B-A140E890BECA";
  const steamship = new Steamship({
    apiKey : "23A44372-4E75-4947-906B-A140E890BECA"
  });

  async function handleClick() {
    const response = await steamship.agent.respond({
      url: url,
      input: {
        prompt: `Give me some ${language} code to teach about functions`,
        //context_id: CONTEXT_ID // Think of this as the chatroom name.
      }
    });

    //const json = await response.json();
    var newCode = response[0].text.match(/```python([^`]*)```/)[1];
    setCode(newCode);
    console.log(newCode);
  }

  // handle the code input by the user

  const onChange = (action, data) => {
    switch (action) {
    case "code": {
      setCode(data);
      break;
    }
    default: {
      console.warn("case not handled!", action, data);
    }
    }};


  return (
    <ChakraProvider>
      <Box display="flex"  justifyContent="center" m={3}>
        <Box m={2} w="50%" borderRadius="2px" justifyContent="center" className="App">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language}
            theme={theme}
            handleThemeChange={handleThemeChange}
            handleLanguageChange={handleLanguageChange}

          />
          <Button colorScheme="blue" onClick={handleClick}>Get Code</Button>
        </Box>
        <Box w="50%" borderRadius="2px" justifyContent="center" m={2}>
          <h1>This is the output window</h1>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
