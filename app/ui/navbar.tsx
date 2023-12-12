'use client';

import type {MouseEvent} from 'react';
import {useState} from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
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
import {templateDataAtom, footerDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const templateData = useAtomValue(templateDataAtom);
  const footerData = useAtomValue(footerDataAtom);
  const {primary_color: primaryColor} = templateData;
  const {logo_image: logoImage} = footerData;

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      className="transition-all duration-300 grid grid-cols-3 items-center px-4 sm:px-8 md:px-12 xl:px-16"
      sx={{backgroundColor: trigger ? primaryColor : 'transparent'}}
    >
      <div className="flex items-center justify-start gap-2">
        <span className="text-sm">Powered by</span>
        <Image src="/logo_plathanus.png" alt="Logo Plathanus" width={123} height={20} priority />
      </div>
      <Toolbar className="flex justify-center">
        <Link href="/">
          <Image src={logoImage} alt="logo" width={235} height={53} priority />
        </Link>
      </Toolbar>
      <div className="flex items-center justify-end gap-2">
        {!loggedIn ? (
          <Button variant="outlined" color="inherit" onClick={handleLogin}>
            Entrar
          </Button>
        ) : (
          <>
            <Button
              variant="text"
              color="inherit"
              onClick={handleMenu}
              endIcon={<ExpandMoreOutlinedIcon />}
            >
              Minha conta
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              disableScrollLock={true}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LocalPlayOutlinedIcon color="info" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Meus ingressos</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonOutlinedIcon color="info" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Meu perfil</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutOutlinedIcon color="info" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
        <IconButton color="inherit">
          <LocalGroceryStoreOutlinedIcon />
        </IconButton>
      </div>
    </AppBar>
  );
}
