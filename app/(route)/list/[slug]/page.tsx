import React from 'react';
import { getPageById, getPageBlocks } from '@/app/_utils/notion';
import { groupListItems } from './groupListItems';
import ListRenderer from './ListRenderer';

// import ListDetailClient from './ListDetailClient';

interface ListDetailProps {
  params: { slug: string };
}

const ListDetailPage = async ({ params }: ListDetailProps) => {
  const { slug } = params;

  const databaseId = process.env.NOTION_DATABASE_ID!;
  const page = await getPageById(databaseId, slug);
  const blocks = await getPageBlocks(databaseId, slug);
  const groupedBlocks = groupListItems(blocks);
  console.log(blocks);

  return <ListRenderer groupedBlocks={groupedBlocks} />;
};

export default ListDetailPage;
