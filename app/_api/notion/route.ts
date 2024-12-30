import { NextResponse } from 'next/server';
import { getPost } from '@/app/_utils/notion';

export const GET = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const posts = await getPost(databaseId);
  return NextResponse.json(posts);
};
