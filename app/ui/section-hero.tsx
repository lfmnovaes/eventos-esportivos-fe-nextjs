'use client';

import type {HomeTemplate} from '@/app/lib/definitions';
import Image from 'next/image';
import {useParams} from 'next/navigation';
import {allTemplateDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';

export default function SectionHero() {
  const allCompaniesTemplateData = useAtomValue(allTemplateDataAtom);
  const {companySlug} = useParams<{companySlug: string}>();
  const companyTemplateData = allCompaniesTemplateData.get(companySlug) as HomeTemplate;
  const {banner_image: heroImage} = companyTemplateData;

  return (
    <section className="w-full h-screen relative">
      <Image
        src={heroImage}
        alt="Hero image"
        fill
        style={{objectFit: 'cover', objectPosition: 'center'}}
        priority
      />
    </section>
  );
}
