import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language = "javascript", code = "" }: { language?: string; code: string }) => {
  return (
    <div className="my-6 rounded-md overflow-hidden text-sm">
      <SyntaxHighlighter language={language} style={oneDark} wrapLines wrapLongLines>
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
