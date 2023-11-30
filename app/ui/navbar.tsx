'use client';

import {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';

// TODO: Use the primary color coming from the store state
const primaryColor: string = '#072342';

export default function Navbar({
  title = 'Logo'
}: {
  title?: string | React.ReactElement;
}) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      if (isTop !== isScrolled) {
        setIsScrolled(isTop);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <Typography variant="h6" component="div" className="text-black">
          {title}
        </Typography>
      );
    } else {
      // Otherwise title is a ReactElement (e.g., an <img> tag)
      return title;
    }
  };

  return (
    <AppBar
      position="fixed"
      className={`${
        isScrolled ? 'bg-transparent' : `bg-[${primaryColor}]`
      } transition-all duration-300 flex items-center`}
    >
      <Toolbar>{renderTitle()}</Toolbar>
    </AppBar>
  );
}
