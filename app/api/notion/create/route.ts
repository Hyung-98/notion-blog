import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/** 새로운 페이지 생성 */
export const POST = async (req: Request) => {
  const { title, description, slug, tags, bodyText } = await req.json();
  const databaseId = process.env.NOTION_DATABASE_ID!;

  try {
    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [{ text: { content: title } }],
        },
        Description: {
          rich_text: [{ text: { content: description } }],
        },
        Slug: {
          rich_text: [{ text: { content: slug } }],
        },
        Date: {
          date: { start: new Date().toISOString() },
        },
        Tag: {
          multi_select: tags.map((t: any) => ({ name: t })),
        },
      },
    });

    // ✅ 상세 내용 블록 추가
    if (bodyText && bodyText.trim() !== "") {
      await notion.blocks.children.append({
        block_id: page.id,
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: bodyText,
                  },
                },
              ],
            },
          },
        ],
      });
    }

    return NextResponse.json({ message: "Page created successfully" });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ message: "Error creating page" }, { status: 500 });
  }
};
