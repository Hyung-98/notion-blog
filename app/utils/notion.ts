import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/** 📘 전체 DB 항목 불러오기 */
export const getDatabaseItems = async (databaseId: string) => {
  const res = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return res.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text ?? "Untitled",
    description: page.properties.Description.rich_text[0]?.plain_text ?? "",
    slug: page.properties.Slug.rich_text[0]?.plain_text ?? "",
    date: page.properties.Date.date.start,
    tags: page.properties.Tag.multi_select ?? [],
    cover: page.cover?.type === "external" ? page.cover.external.url : page.cover?.file?.url ?? null,
  }));
};

/** 🔍 pageId로 Page 조회 */
export const getPageById = async (pageId: string) => {
  const page = await notion.pages.retrieve({ page_id: pageId });
  return page;
};

/** 📦 해당 Page의 Blocks 가져오기 (+ 하위 children 처리) */
export const getPageBlocks = async (pageId: string) => {
  const res = await notion.blocks.children.list({ block_id: pageId });
  console.log(res);

  const blocksWithChildren = await Promise.all(
    res.results.map(async (block: any) => {
      if (block.has_children) {
        const children = await notion.blocks.children.list({
          block_id: block.id,
        });
        return { ...block, children: children.results };
      }
      return block;
    })
  );

  return blocksWithChildren;
};
