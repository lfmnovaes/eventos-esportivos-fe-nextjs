'use client';

import {useAtomValue} from 'jotai';
import {Navbar, SectionHero, SectionText, SectionEvents, SectionCalendar, Footer} from '@/app/ui';
import {companiesDataAtom} from '@/app/atoms';

export default function CompanyPage({params: {companySlug}}: {params: {companySlug: string}}) {
  const companiesData = useAtomValue(companiesDataAtom);

  if (companySlug === 'undefined' || !companiesData.find((c) => c.slug === companySlug)) {
    return <h1 className="w-full py-32">Empresa inválida</h1>;
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between leading-5">
        <SectionHero />
        <SectionText />
        <SectionEvents />
        <SectionCalendar />
      </main>
      <Footer />
    </>
  );
}
