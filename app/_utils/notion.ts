import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabaseItems = async (databaseId: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title.title[0].plain_text || 'Untitled',
      description: page.properties.Description.rich_text[0].text.content || '',
      date: page.properties.Date.date.start || '',
      slug: page.properties.Slug.rich_text[0].plain_text || '',
      tags: page.properties.Tag.multi_select || [],
    }));
  } catch (error) {
    console.error(`Error fetching blogs: ${error}`);
    throw error;
  }
};

export const getPageById = async (databaseId: string, slug: string) => {
  try {
    const database = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    const pageId = database.results[0].id;
    const page = await notion.pages.retrieve({ page_id: pageId });
    return page;
  } catch (error) {
    console.error(`Error fetching page: ${error}`);
    throw error;
  }
};

export const getPageBlocks = async (databaseId: string, slug: string) => {
  try {
    const database = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    const blockId = database.results[0].id;
    const blocks = await notion.blocks.children.list({ block_id: blockId });

    // notion api data 하위 children data 가져오기
    const enrichedBlocks = await Promise.all(
      blocks.results.map(async (block: any) => {
        if (block.type === 'table' || block.has_children) {
          const children = await notion.blocks.children.list({ block_id: block.id });
          return { ...block, children: children.results };
        }

        return block;
      }),
    );

    return enrichedBlocks;
  } catch (error) {
    console.error(`Error fetching blocks: ${error}`);
    throw error;
  }
};
