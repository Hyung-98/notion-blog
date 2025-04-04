import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const GET = async (req: NextRequest) => {
  const pageId = req.nextUrl.searchParams.get("pageId");
  if (!pageId) return NextResponse.json({ error: "Missing pageId" }, { status: 400 });

  const page = await notion.pages.retrieve({ page_id: pageId });

  if (!("properties" in page)) {
    return NextResponse.json({ error: "Invalid page object" }, { status: 400 });
  }

  const titleProperty = page.properties.Title;
  const title = titleProperty?.type === "title" ? titleProperty.title?.[0]?.plain_text || "" : "";
  const descriptionProperty = page.properties?.Description;
  const description =
    descriptionProperty?.type === "rich_text" ? descriptionProperty.rich_text?.[0]?.plain_text || "" : "";
  const slugProperty = page.properties?.Slug;
  const slug = slugProperty?.type === "rich_text" ? slugProperty.rich_text?.[0]?.plain_text || "" : "";
  const tagProperty = page.properties?.Tag;
  const tags = tagProperty?.type === "multi_select" ? tagProperty.multi_select?.map((t) => t.name) || [] : [];

  return NextResponse.json({ title, description, slug, tags });
};
