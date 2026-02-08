'use client';

import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed right-6 bottom-6 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform duration-200 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none' } bg-brand text-white`}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
