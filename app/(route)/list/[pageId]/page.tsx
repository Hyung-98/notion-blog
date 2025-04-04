import { getPageBlocks } from "@/app/utils/notion";
import convertNotionBlocksToMDX from "@/app/utils/notionToMdx";
import { serialize } from "next-mdx-remote/serialize";
import MdxRenderer from "@/app/components/shared/MdxRenderer";
import Link from "next/link";
import DeleteButton from "@/app/components/ui/DeleteButton";

const ListDetailPage = async ({ params }: { params: { pageId: string } }) => {
  const { pageId } = await params;
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!dbId) throw new Error("NOTION_DATABASE_ID is not defined");
  const blocks = await getPageBlocks(pageId);
  const mdxContent = convertNotionBlocksToMDX(blocks);
  const mdxSource = await serialize(mdxContent);

  return (
    <div className="prose dark:prose-invert mx-auto py-10">
      <MdxRenderer source={mdxSource} />

      <div className="flex items-center justify-end gap-4 mt-10">
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/admin/edit/${pageId}`} className="!bg-blue-500 !text-white px-4 py-2 rounded">
            수정
          </Link>
          <DeleteButton pageId={pageId} />
          <Link href="/admin/create" className="!bg-blue-500 !text-white px-4 py-2 rounded">
            등록
          </Link>
        </div>
        <div className="flex justify-end mt-5 ">
          <Link href="/list" className="!bg-gray-500 !text-white px-4 py-2 rounded">
            목록
          </Link>
        </div>
        <div className="flex justify-end mt-5 ">
          <Link href="/" className="!bg-gray-500 !text-white px-4 py-2 rounded">
            홈
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListDetailPage;
