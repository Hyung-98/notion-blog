import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getNotionPageData = unstable_cache(
  async (databaseId: string, slug: string) => {
    const query = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    });

    const pageId = query.results[0]?.id;
    if (!pageId) throw new Error(`Page not found: ${slug}`);

    const [page, blocks] = await Promise.all([notion.pages.retrieve({ page_id: pageId }), getBlockTree(pageId)]);

    return { page, blocks };
  },
  ["notion-page"], // 캐시 키
  { revalidate: 60 } // ISR 60초
);

const getBlockTree = async (pageId: string) => {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  return Promise.all(
    blocks.results.map(async (block: any) => {
      if (block.has_children) {
        const children = await notion.blocks.children.list({ block_id: block.id });
        return { ...block, children: children.results };
      }
      return block;
    })
  );
};

export const getDatabaseItemsCached = unstable_cache(
  async (databaseId: string) => {
    const response = await notion.databases.query({ database_id: databaseId });
    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text || "Untitled",
      description: page.properties.Description.rich_text[0]?.text.content || "",
      date: page.properties.Date.date.start || "",
      slug: page.properties.Slug.rich_text[0]?.plain_text || "",
      tags: page.properties.Tag.multi_select || [],
    }));
  },
  ["notion-database-items"],
  { revalidate: 60 }
);
