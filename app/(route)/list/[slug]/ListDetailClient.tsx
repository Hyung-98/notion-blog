"use client";

import React, { useEffect } from "react";
import useAppStore from "@/app/_types/_store/useAppStore";
import BlockRenderer from "./BlockRenderer";

interface ListDetailClientProps {
  page: any;
  blocks: any[];
}

const ListDetailClient: React.FC<ListDetailClientProps> = ({ page, blocks }) => {
  const { setNotionData } = useAppStore();

  useEffect(() => {
    setNotionData({ page, blocks });
  }, [page, blocks, setNotionData]);

  return (
    <div>
      <h1>{page.properties.Title.title[0].plain_text || "Untitled"}</h1>
      <div>
        {blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};

export default ListDetailClient;
