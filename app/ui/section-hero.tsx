'use client';

import Image from 'next/image';
import {templateDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';

export default function SectionHero() {
  const templateData = useAtomValue(templateDataAtom);
  const {banner_image: heroImage} = templateData;

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
