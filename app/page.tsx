import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Link href={`/list`}>
        <h1 className='text-8xl font-bold hover:text-zinc-500 transition-colors'>Notion Blog</h1>
      </Link>
    </div>
  );
}
