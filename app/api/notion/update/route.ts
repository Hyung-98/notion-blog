import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/** 페이지 업데이트 */
export const PATCH = async (req: Request) => {
  const { pageId, title, description, slug, tags, bodyText } = await req.json();

  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        ...(title && {
          Title: { title: [{ text: { content: title } }] },
        }),
        ...(description && {
          Description: { rich_text: [{ text: { content: description } }] },
        }),
        ...(slug && {
          Slug: { rich_text: [{ text: { content: slug } }] },
        }),
        ...(tags && {
          Tag: { multi_select: tags.map((t: string) => ({ name: t })) },
        }),
        ...(bodyText && {
          Body: { rich_text: [{ text: { content: bodyText } }] },
        }),
      },
    });

    return NextResponse.json({ message: "Page updated successfully" });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json({ message: "Error updating page" }, { status: 500 });
  }
};
