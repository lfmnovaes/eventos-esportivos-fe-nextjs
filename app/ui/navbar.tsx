'use client';

import {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';
import {templateDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';

export default function Navbar({
  title = 'Logo'
}: {
  title?: string | React.ReactElement;
}) {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const templateData = useAtomValue(templateDataAtom);

  const {primary_color: primaryColor} = templateData;

  useEffect(() => {
    const handleScroll = () => {
      const isOnTop = window.scrollY < 100;
      if (isOnTop !== isAtTop) {
        setIsAtTop(isOnTop);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAtTop]);

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
      className={'transition-all duration-300 flex items-center'}
      sx={{backgroundColor: isAtTop ? 'transparent' : primaryColor}}
    >
      <Toolbar>{renderTitle()}</Toolbar>
    </AppBar>
  );
}
