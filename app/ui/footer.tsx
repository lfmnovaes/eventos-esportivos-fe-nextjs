'use client'; // Needed to allow PhoneInTalk and FacebookOutlined to work

import Image from 'next/image';
import Link from 'next/link';
import {Box, Divider, IconButton} from '@mui/material';
import {
  PlaceOutlined as PlaceOutlinedIcon,
  LanguageOutlined as LanguageOutlinedIcon,
  PhoneInTalk as PhoneInTalkIcon,
  FacebookOutlined as FacebookOutlinedIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';

// TODO: Use the primary color coming from the store state
const primaryColor: string = '#072342';

export default function Footer() {
  return (
    <Box
      component={'footer'}
      className="flex flex-col py-8 px-16"
      sx={{backgroundColor: primaryColor}}
    >
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col gap-4">
          <Image src="/logo.png" alt="Logo" width={235} height={53} />
          <p className="text-base">Onde estamos</p>
          <div className="flex gap-2">
            <PlaceOutlinedIcon className="h-4 w-4" />
            <p className="text-sm">
              Av. Centenário, nº 500 Pinheirinho
              <br />
              Criciúma, SC - 88804-000
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-base">Acesse nosso site</p>
          <div className="flex gap-2">
            <LanguageOutlinedIcon className="h-4 w-4 text-white" />
            <Link
              href="https://techspeedkart.com"
              target="_blank"
              rel="noopener"
            >
              <p className="text-sm">techspeedkart.com</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-base">Fale conosco</p>
          <div className="flex gap-2">
            <PhoneInTalkIcon className="h-4 w-4 text-white" />
            <Link href="tel:4834374488" target="_blank" rel="noopener">
              <p className="text-sm">(48) 3437-4488</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-base">Nossas redes sociais</p>
          <div className="flex gap-2">
            <IconButton className="w-fit p-0">
              <InstagramIcon className="h-8 w-8 text-white" />
            </IconButton>
            <IconButton className="w-fit p-0">
              <FacebookOutlinedIcon className="h-8 w-8 text-white" />
            </IconButton>
          </div>
        </div>
        <div className="flex self-end">
          <Link href="https://www.google.com/" target="_blank" rel="noopener">
            <p className="text-sm">Termos e políticas</p>
          </Link>
        </div>
      </div>
      <Divider color="white" className="my-4" />
      <div className="flex self-center gap-2">
        <p className="text-sm">Powered by </p>
        <Image src="/logo_plathanus.png" alt="Logo" width={138} height={23} />
      </div>
    </Box>
  );
}
