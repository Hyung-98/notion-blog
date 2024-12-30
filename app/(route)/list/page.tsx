import React from 'react';
import { getDatabaseItems } from '@/app/_utils/notion';
import Link from 'next/link';

const ListPage = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const database = await getDatabaseItems(databaseId);

  return (
    <div className='pt-14'>
      <ul className='flex justify-between px-4 gap-4'>
        {database.map((item) => (
          <li
            key={item.id}
            className='w-1/3 border rounded-xl'
          >
            <Link
              href={`/list/${item.slug}`}
              className='w-full h-full p-3 flex flex-col gap-4 rounded-xl hover:bg-slate-300 transition-all hover:text-gray-600'
            >
              <h2 className='title text-lg font-bold'>{item.title}</h2>
              <p className='date text-base'>{new Date(item.date).toLocaleString()}</p>
              <ul className='tags flex flex-wrap gap-1'>
                {item.tags.map((tag: any) => (
                  <li
                    key={tag.id}
                    className='text-xs px-2 py-1 border rounded bg-slate-100'
                  >
                    #{tag.name}
                  </li>
                ))}
              </ul>
              <p className='description font-medium'>{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
