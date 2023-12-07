'use client';

import {AppBar, Toolbar, useScrollTrigger} from '@mui/material';
import Image from 'next/image';
import {templateDataAtom, footerDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';

export default function Navbar() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const templateData = useAtomValue(templateDataAtom);
  const footerData = useAtomValue(footerDataAtom);
  const {primary_color: primaryColor} = templateData;
  const {logo_image: logoImage} = footerData;

  return (
    <AppBar
      position="fixed"
      className={'transition-all duration-300 flex items-center'}
      sx={{backgroundColor: trigger ? primaryColor : 'transparent'}}
    >
      <Toolbar>
        <Image src={logoImage} alt="logo" width={235} height={53} priority />
      </Toolbar>
    </AppBar>
  );
}
