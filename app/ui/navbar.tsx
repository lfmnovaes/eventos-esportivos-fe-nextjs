'use client';

import {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';
import {templateDataAtom} from '@/app/store';
import {useAtomValue} from 'jotai';
import {useHydrateAtoms} from 'jotai/utils';

// TODO: Use the primary color coming from the store state
const primaryColor: string = '#072342';

export default function Navbar({
  title = 'Logo',
  templateHomeData
}: {
  title?: string | React.ReactElement;
  templateHomeData: any;
}) {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  useHydrateAtoms([[templateDataAtom, templateHomeData]]);
  const templateData = useAtomValue(templateDataAtom);

  console.log('from navbar', templateData);

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
