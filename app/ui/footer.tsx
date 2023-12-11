'use client';

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
import {useAtomValue} from 'jotai';
import {templateDataAtom, footerDataAtom} from '@/app/atoms';
import {getDomainName, formatBrazilianPhoneNumber} from '@/app/lib/utils';

export default function Footer() {
  const templateData = useAtomValue(templateDataAtom);
  const footerData = useAtomValue(footerDataAtom);
  const {primary_color: primaryColor} = templateData;
  const {
    logo_image: logoImage,
    terms_and_policies: termsAndPoliciesLink,
    contact_info: {website, phone, instagram, facebook}
  } = footerData;

  const paragraphTitle = "text-sm xl:text-base";

  return (
    <Box
      component={'footer'}
      className="flex flex-col py-8 px-4 sm:px-8 md:px-12 xl:px-16"
      sx={{backgroundColor: primaryColor}}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-4">
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
          <Image src={logoImage} alt="Logo" width={235} height={53} />
          <p className={paragraphTitle}>Onde estamos</p>
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
          <p className={paragraphTitle}>Acesse nosso site</p>
          <div className="flex gap-2">
            <LanguageOutlinedIcon className="h-4 w-4 text-white" />
            <Link href={website} target="_blank" rel="noopener">
              <p className="text-sm">{getDomainName(website)}</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className={paragraphTitle}>Fale conosco</p>
          <div className="flex gap-2">
            <PhoneInTalkIcon className="h-4 w-4 text-white" />
            <Link href={`tel:${phone}`} target="_blank" rel="noopener">
              <p className="text-sm">{formatBrazilianPhoneNumber(phone)}</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className={paragraphTitle}>Nossas redes sociais</p>
          <div className="flex gap-2">
            <IconButton href={instagram} className="w-fit p-0" target="_blank" rel="noopener">
              <InstagramIcon className="h-8 w-8 text-white" />
            </IconButton>
            <IconButton href={facebook} className="w-fit p-0" target="_blank" rel="noopener">
              <FacebookOutlinedIcon className="h-8 w-8 text-white" />
            </IconButton>
          </div>
        </div>
        <div className="flex self-end justify-self-end">
          <Link href={termsAndPoliciesLink} target="_blank" rel="noopener">
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
