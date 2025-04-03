"use client";

import React, { useEffect } from "react";
import BlockRenderer from "./BlockRenderer";
import useAppStore from "@/app/_types/_store/useAppStore";
import styles from "@/app/_styles/ListDetailPage.module.scss";

interface ListRendererProps {
  groupedBlocks: any[];
}

const ListRenderer: React.FC<ListRendererProps> = ({ groupedBlocks }) => {
  const { setNotionData } = useAppStore();

  useEffect(() => {
    setNotionData({ groupedBlocks });
  }, [groupedBlocks, setNotionData]);

  return (
    <div className={`pt-10 ${styles.detail}`}>
      {groupedBlocks.map((group, index) => {
        if (group.type === "bulleted_list_item") {
          return (
            <ul key={index}>
              {group.items.map((item: any) => (
                <li key={item.id}>
                  {item.bulleted_list_item.rich_text.map((text: any, idx: number) => (
                    <span key={idx}>{text.text.content}</span>
                  ))}
                </li>
              ))}
            </ul>
          );
        } else if (group.type === "numbered_list_item") {
          return (
            <ol key={index}>
              {group.items.map((item: any) => (
                <li key={item.id}>
                  {item.numbered_list_item.rich_text.map((text: any, idx: number) => (
                    <span key={idx}>{text.text.content}</span>
                  ))}
                </li>
              ))}
            </ol>
          );
        } else {
          return <BlockRenderer key={group.id} block={group} />;
        }
      })}
    </div>
  );
};

export default ListRenderer;
