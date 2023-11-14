import React from 'react';
import { Box } from "@chakra-ui/react";

import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, handleLanguageChange, handleThemeChange, language, code, theme }) => {

  return (
    <Box borderRadius="10px" borderColor="black.200" border="2px" w="100%" className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <select value={language} onChange={handleLanguageChange}>
        <option value="python">Python</option>
        <option value="javascript">Javascript</option>
        <option value="html">HTML</option>
      </select>
      <select value={theme} onChange={handleThemeChange}>
        <option value="vs-light">VS light</option>
        <option value="vs-dark">VS dark</option>
        <option value="hc-black">HC black</option>
      </select>
      <Editor
        height="85vh"
        width={`100%`}
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
