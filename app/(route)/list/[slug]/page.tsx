// import React from "react";
// import { getNotionPageData } from "@/app/_utils/notion";
// import { groupListItems } from "./groupListItems";
// import ListRenderer from "./ListRenderer";

// interface ListDetailProps {
//   params: { slug: string };
// }

// const ListDetailPage = async ({ params }: ListDetailProps) => {
//   const { page, blocks } = await getNotionPageData(process.env.NOTION_DATABASE_ID!, params.slug);
//   const groupedBlocks = groupListItems(blocks);

//   return <ListRenderer groupedBlocks={groupedBlocks} />;
// };

// export default ListDetailPage;

import React from "react";
import { getPageBlocks } from "@/app/_utils/notion";
import convertNotionBlocksToMDX from "@/app/_utils/notionToMdx";
import { serialize } from "next-mdx-remote/serialize";
import MdxRenderer from "@/app/_components/shared/MdxRenderer";

const ListDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!dbId) throw new Error("NOTION_DATABASE_ID is not defined");
  const blocks = await getPageBlocks(dbId, slug);
  const mdxContent = convertNotionBlocksToMDX(blocks);
  const mdxSource = await serialize(mdxContent);

  return (
    <div className="prose dark:prose-invert mx-auto py-10">
      <MdxRenderer source={mdxSource} />
    </div>
  );
};

export default ListDetailPage;
