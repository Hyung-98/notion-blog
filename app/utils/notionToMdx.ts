type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: any;
};

const convertNotionBlocksToMDX = (blocks: NotionBlock[], depth = 0): string => {
  return blocks
    .map((block) => {
      const type = block.type;
      const indent = "  ".repeat(depth);

      switch (type) {
        case "paragraph":
          const texts = block.paragraph.rich_text;
          if (!texts.length) return "";

          const safeTexts = JSON.stringify(texts);

          return `${indent}<Paragraph texts={${safeTexts}} />`;

        case "heading_1":
        case "heading_2":
        case "heading_3": {
          const level = type === "heading_1" ? "#" : type === "heading_2" ? "##" : "###";
          const text = block[type].rich_text.map((t: any) => t.plain_text).join("");
          return `${indent}${level} ${text}`;
        }

        case "quote": {
          const text = block.quote.rich_text.map((t: any) => t.plain_text).join("");
          return `${indent}<Quote>${text}</Quote>`;
        }

        case "divider":
          return `${indent}<Divider />`;

        case "image": {
          const url = block.image.type === "external" ? block.image.external.url : block.image.file.url;
          return `${indent}![Notion Image](${url})`;
        }

        case "code": {
          const lang = block.code.language;
          const code = block.code.rich_text.map((t: any) => t.plain_text).join("");
          const escapedCode = (str: string) => str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
          return `<CodeBlock language="${lang}" code={String.raw\`${escapedCode(code)}\`} />`;
        }

        case "video":
        case "embed": {
          const url = block[type].type === "external" ? block[type].external.url : block[type].file?.url ?? "";
          return `${indent}<Embed url="${url}" />`;
        }

        case "toggle": {
          const title = block.toggle.rich_text.map((t: any) => t.plain_text).join("");
          const children = block.children ?? [];
          const childContent = convertNotionBlocksToMDX(children, depth + 1);
          return `${indent}<ToggleBlock title="${escapeQuotes(title)}">\n${childContent}\n${indent}</ToggleBlock>`;
        }

        case "table": {
          const rows = block.children?.map((row: any) =>
            row.table_row.cells.map((cell: any[]) => cell.map((t) => t.plain_text).join(""))
          );
          return `<Table rows={${JSON.stringify(rows)}} />`;
        }

        case "bookmark": {
          const url = block.bookmark.url;
          return `<Bookmark url="${url}" />`;
        }

        default:
          return ""; // 미지원 블록은 생략
      }
    })
    .filter(Boolean)
    .join("\n\n");
};

export const escapeQuotes = (str: string) => str.replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export default convertNotionBlocksToMDX;
