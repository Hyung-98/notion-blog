"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  Callout,
  CodeBlock,
  Paragraph,
  Heading,
  ToggleBlock,
  Quote,
  Divider,
  EmbedVideo,
  Table,
  Bookmark,
} from "./notion";

const components = {
  Paragraph,
  Heading,
  ToggleBlock,
  Quote,
  Divider,
  EmbedVideo,
  Callout,
  CodeBlock,
  Table,
  Bookmark,
};

const MdxRenderer = ({ source }: { source: MDXRemoteSerializeResult }) => {
  return <MDXRemote {...source} components={components} />;
};

export default MdxRenderer;
