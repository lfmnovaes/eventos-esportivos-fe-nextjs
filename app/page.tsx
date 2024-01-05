'use client';

import type {CompanyData} from '@/app/lib/definitions';
import Link from 'next/link';
import {useAtomValue} from 'jotai';
import {companiesDataAtom} from './atoms';

export default function Home() {
  const companiesData = useAtomValue(companiesDataAtom);

  return (
    <div className="p-32">
      <h1 className="text-4xl font-bold py-16">Apex hub</h1>
      {companiesData.map((company: CompanyData) => (
        <Link key={company.id} href={`/${company.slug}`}>
          {company.name}
        </Link>
      ))}
    </div>
  );
}
