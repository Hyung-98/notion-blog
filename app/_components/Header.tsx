'use client';

import React, { useCallback, useEffect, useState } from 'react';

const Header = () => {
  const [scroll, setScroll] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onScroll = useCallback(() => {
    const { scrollY } = window;
    if (scrollY >= 200) {
      setScroll('header-fixed');
    } else setScroll('');
  }, []);

  return (
    <div className={`absolute top-0 w-full bg-white ${scroll}`}>
      <ul className='flex justify-end gap-2 px-4 py-4 text-lg font-bold'>
        <li>Hyung's Blog</li>
        <li>DARK</li>
      </ul>
    </div>
  );
};

export default Header;
