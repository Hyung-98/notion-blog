import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/** 페이지 삭제 */
export const DELETE = async (req: Request) => {
  const { pageId } = await req.json();

  if (!pageId) return NextResponse.json({ error: "Missing pageId" }, { status: 400 });

  try {
    await notion.pages.update({
      page_id: pageId,
      archived: true,
    });

    return NextResponse.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json({ message: "Error deleting page" }, { status: 500 });
  }
};
