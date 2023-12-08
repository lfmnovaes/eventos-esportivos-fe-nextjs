import {useState, useEffect} from 'react';

export default function useWindowSize(): number {
  const [windowSize, setWindowSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
