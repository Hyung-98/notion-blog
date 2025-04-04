import React from "react";
import { getDatabaseItems } from "@/app/utils/notion";
import Link from "next/link";

const ListPage = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const database = await getDatabaseItems(databaseId);

  return (
    <div className="pt-5">
      <ul className="flex justify-between gap-4">
        {database.map((item) => (
          <li
            key={item.id}
            className="w-1/3 border border-gray-400 rounded-xl hover:bg-slate-50 transition-all dark:hover:bg-slate-600"
          >
            <Link
              href={`/list/${item.id}`}
              className="w-full h-full p-3 flex flex-col gap-4 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <h2 className="title text-lg font-bold">{item.title}</h2>
              <p className="date text-base">{new Date(item.date).toLocaleString()}</p>
              <ul className="tags flex flex-wrap gap-1">
                {item.tags.map((tag: any, index: number) => (
                  <li key={tag.id || index} className="text-xs px-2 py-1 border rounded bg-slate-100 dark:bg-slate-800">
                    #{tag.name}
                  </li>
                ))}
              </ul>
              <p className="description font-medium">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-end mt-5 ">
        <Link href="/admin/create" className="!bg-blue-500 !text-white px-4 py-2 rounded">
          글 등록하기
        </Link>
      </div>
    </div>
  );
};

export default ListPage;
