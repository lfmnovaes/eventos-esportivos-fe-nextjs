'use client';

import type {FooterData, HomeTemplate} from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {Box, Divider, IconButton} from '@mui/material';
import {
  PlaceOutlined as PlaceOutlinedIcon,
  LanguageOutlined as LanguageOutlinedIcon,
  PhoneInTalk as PhoneInTalkIcon,
  FacebookOutlined as FacebookOutlinedIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';
import {useAtomValue} from 'jotai';
import {horizontalPaddingAtom, allTemplateDataAtom, allFooterDataAtom} from '@/app/atoms';
import {getDomainName, formatBrazilianPhoneNumber, splitText} from '@/app/lib/utils';

export default function Footer() {
  const {companySlug} = useParams<{companySlug: string}>();
  const allCompaniesTemplateData = useAtomValue(allTemplateDataAtom);
  const companyTemplateData = allCompaniesTemplateData.get(companySlug) as HomeTemplate;
  const allFooterData = useAtomValue(allFooterDataAtom);
  const footerData = allFooterData.get(companySlug) as FooterData;
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);

  const {primary_color: primaryColor} = companyTemplateData;
  const {
    logo_image: logoImage,
    terms_and_policies: termsAndPoliciesLink,
    contact_info: {website, phone, instagram, facebook},
    address: {line}
  } = footerData;

  const paragraphTitle = 'text-sm xl:text-base';

  return (
    <Box
      component={'footer'}
      className={`flex flex-col py-8 text-white ${horizontalPadding} `}
      sx={{backgroundColor: primaryColor}}
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-4">
        <div className="col-span-1 sm:col-span-5 lg:col-span-4 flex flex-col gap-4 order-1">
          <Image src={logoImage} alt="Logo" width={235} height={53} />
          <p className={paragraphTitle}>Onde estamos</p>
          <div className="flex gap-2">
            <PlaceOutlinedIcon sx={{height: 16, width: 16}} />
            <div className="flex flex-col text-sm">
              {splitText(line).map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-1 sm:col-span-4 md:col-span-3 lg:col-span-2 gap-4 order-2">
          <p className={paragraphTitle}>Acesse nosso site</p>
          <div className="flex gap-2">
            <LanguageOutlinedIcon sx={{height: 16, width: 16}} />
            <Link href={website} target="_blank" rel="noopener">
              <p className="text-sm">{getDomainName(website)}</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col col-span-1 sm:col-span-3 lg:col-span-2 gap-4 order-4 lg:order-3">
          <p className={paragraphTitle}>Fale conosco</p>
          <div className="flex gap-2">
            <PhoneInTalkIcon sx={{height: 16, width: 16}} />
            <Link href={`tel:${phone}`} target="_blank" rel="noopener">
              <p className="text-sm">{formatBrazilianPhoneNumber(phone)}</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col col-span-1 sm:col-span-3 lg:col-span-2 gap-4 order-3 lg:order-4">
          <p className={paragraphTitle}>Nossas redes sociais</p>
          <div className="flex gap-2">
            <IconButton href={instagram} className="w-fit p-0" target="_blank" rel="noopener">
              <InstagramIcon className="text-white" sx={{height: 32, width: 32}} />
            </IconButton>
            <IconButton href={facebook} className="w-fit p-0" target="_blank" rel="noopener">
              <FacebookOutlinedIcon className="text-white" sx={{height: 32, width: 32}} />
            </IconButton>
          </div>
        </div>
        <div className="flex self-end col-span-1 sm:col-span-9 lg:col-span-2 justify-self-end order-5">
          <Link href={termsAndPoliciesLink} target="_blank" rel="noopener">
            <p className="text-sm">Termos e políticas</p>
          </Link>
        </div>
      </div>
      <Divider color="white" sx={{marginY: '1rem'}} />
      <div className="flex self-center gap-2">
        <p className="text-sm">Powered by </p>
        <Image src="/logo_plathanus.svg" alt="Logo Plathanus" width={138} height={23} priority />
      </div>
    </Box>
  );
}
