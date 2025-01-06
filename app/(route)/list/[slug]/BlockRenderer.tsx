import React from "react";
import TableRenderer from "./TableRenderer";
import ToggleRenderer from "./ToggleRenderer";

const BlockRenderer: React.FC<{ block: any }> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          {block.paragraph.rich_text.map((text: any, idx: number) => (
            <span key={idx}>{text.text.content}</span>
          ))}
        </p>
      );

    case "heading_1":
      return (
        <h1>
          {block.heading_1.rich_text.map((text: any, idx: number) => (
            <span key={idx}>{text.text.content}</span>
          ))}
        </h1>
      );

    case "heading_2":
      return (
        <h2>
          {block.heading_2.rich_text.map((text: any, idx: number) => (
            <span key={idx}>{text.text.content}</span>
          ))}
        </h2>
      );

    case "heading_3":
      return (
        <h2>
          {block.heading_3.rich_text.map((text: any, idx: number) => (
            <span key={idx}>{text.text.content}</span>
          ))}
        </h2>
      );

    case "code":
      return (
        <pre>
          <code>
            {block.code.rich_text.map((text: any, idx: number) => (
              <span key={idx}>{text.text.content}</span>
            ))}
          </code>
        </pre>
      );

    case "table":
      return <TableRenderer table={block} />;

    case "toggle":
      return <ToggleRenderer block={block} />;

    default:
      return <div>Unsupported block type: {block.type}</div>;
  }
};

export default BlockRenderer;
