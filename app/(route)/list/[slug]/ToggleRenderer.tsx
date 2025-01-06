"use client";

import React, { useState } from "react";
import BlockRenderer from "./BlockRenderer";

interface ToggleRendererProps {
  block: any;
}

const ToggleRenderer: React.FC<ToggleRendererProps> = ({ block }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleContent = block.toggle.rich_text.map((text: any) => text.text.content).join("");

  return (
    <div>
      <div
        style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "0.5rem" }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {toggleContent} {isOpen ? "▼" : "▶"}
      </div>
    </div>
  );
};

export default ToggleRenderer;
