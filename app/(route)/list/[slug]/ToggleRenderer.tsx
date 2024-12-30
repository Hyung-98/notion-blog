'use client';

import React, { useState } from 'react';
import BlockRenderer from './BlockRenderer';

interface ToggleRendererProps {
  block: any;
}

const ToggleRenderer: React.FC<ToggleRendererProps> = ({ block }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleContent = block;

  return <div></div>;
};

export default ToggleRenderer;
