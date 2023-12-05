import React from 'react';
import { Box } from "@chakra-ui/react";

import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, handleLanguageChange, handleThemeChange, language, code, theme }) => {

  return (
    <Box borderRadius="10px" borderColor="black.200" border="2px" w="100%" className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <div p={4} w="100%">
        <select id="languages" style={{ backgroundColor: "#1f1717", color:"white" }} value={language} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="javascript">Javascript</option>
          <option value="cpp">C++</option>
        </select>
        <select style={{ backgroundColor: "#1f1717", color:"white" }} value={theme} onChange={handleThemeChange}>
          <option value="vs-light">VS light</option>
          <option value="vs-dark">VS dark</option>
          <option value="hc-black">HC black</option>
        </select>
      </div>
      <Editor
        p={4}
        height="85vh"
        width={`100%`}
        data-testid="code-editor-test-id"
        language={language || "javascript"}
        value={code}
        theme={theme}
        defaultValue="// some comment"
        onChange={onChange}
      />
    </Box>
  );
};

export default CodeEditor;
