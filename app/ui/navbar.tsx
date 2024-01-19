'use client';

import type {MouseEvent} from 'react';
import type {FooterData, HomeTemplate} from '@/app/lib/definitions';
import {useState} from 'react';
import {useParams, usePathname} from 'next/navigation';
import Link from 'next/link';
import {
  AppBar,
  useScrollTrigger,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  LocalGroceryStoreOutlined as LocalGroceryStoreOutlinedIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
  LocalPlayOutlined as LocalPlayOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon
} from '@mui/icons-material';
import Image from 'next/image';
import {useAtomValue} from 'jotai';
import {horizontalPaddingAtom, allTemplateDataAtom, allFooterDataAtom} from '@/app/atoms';
import {useSession} from 'next-auth/react';

export default function Navbar({solidBackground = false}: {solidBackground?: boolean}) {
  const {data: session} = useSession();
  const {companySlug} = useParams<{companySlug: string}>();
  const allCompaniesTemplateData = useAtomValue(allTemplateDataAtom);
  const companyTemplateData = allCompaniesTemplateData.get(companySlug) as HomeTemplate;
  const allFooterData = useAtomValue(allFooterDataAtom);
  const footerData = allFooterData.get(companySlug) as FooterData;
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const pathname = usePathname();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const {primary_color: primaryColor} = companyTemplateData;
  const {logo_image: logoImage} = footerData;

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      className={`transition-all duration-300 h-16 grid grid-cols-3 items-center ${horizontalPadding}`}
      sx={{
        display: 'grid',
        gridtemplateColumns: 'repeat(3, minmax(0, 1fr))',
        backgroundColor: solidBackground ? primaryColor : trigger ? primaryColor : 'transparent'
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-start gap-2">
        <span className="text-xs md:text-sm">Powered by</span>
        <Image
          className="w-20 sm:w-32"
          src="/logo_plathanus.svg"
          alt="Logo Plathanus"
          width={123}
          height={20}
          priority
        />
      </div>
      <div className="flex justify-center">
        <Link href={`/${companySlug}`}>
          <Image src={logoImage} alt="logo" width={235} height={53} priority />
        </Link>
      </div>
      <div className="flex items-center justify-end gap-4">
        {session ? (
          <>
            <Button
              variant="text"
              color="inherit"
              onClick={handleMenu}
              endIcon={<ExpandMoreOutlinedIcon />}
              sx={{
                '@media (max-width: 639px)': {
                  display: 'none'
                }
              }}
            >
              Minha conta
            </Button>
            <IconButton
              color="inherit"
              onClick={handleMenu}
              sx={{
                '@media (min-width: 640px)': {
                  display: 'none'
                }
              }}
            >
              <PersonOutlinedIcon />
              <ExpandMoreOutlinedIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              disableScrollLock={true}
            >
              <Link href="/dashboard">
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <LocalPlayOutlinedIcon color="info" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Meus ingressos</ListItemText>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <PersonOutlinedIcon color="info" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Meu perfil</ListItemText>
              </MenuItem>
              <Link href={`/logout?callbackUrl=${pathname}`} passHref>
                <MenuItem>
                  <ListItemIcon>
                    <LogoutOutlinedIcon color="info" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Sair</ListItemText>
                </MenuItem>
              </Link>
            </Menu>
          </>
        ) : (
          <Link href={`/login?callbackUrl=${pathname}`} passHref>
            <Button variant="outlined" color="inherit">
              Entrar
            </Button>
          </Link>
        )}
        <IconButton color="inherit">
          <LocalGroceryStoreOutlinedIcon />
        </IconButton>
      </div>
    </AppBar>
  );
}
