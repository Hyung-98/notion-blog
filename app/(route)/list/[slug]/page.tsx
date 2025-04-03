import React from "react";
import { getNotionPageData } from "@/app/_utils/notion";
import { groupListItems } from "./groupListItems";
import ListRenderer from "./ListRenderer";

interface ListDetailProps {
  params: { slug: string };
}

const ListDetailPage = async ({ params }: ListDetailProps) => {
  const { page, blocks } = await getNotionPageData(process.env.NOTION_DATABASE_ID!, params.slug);
  const groupedBlocks = groupListItems(blocks);

  return <ListRenderer groupedBlocks={groupedBlocks} />;
};

export default ListDetailPage;
