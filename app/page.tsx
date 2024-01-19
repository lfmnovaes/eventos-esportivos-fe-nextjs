'use client';

import type {CompanyData} from '@/app/lib/definitions';
import Link from 'next/link';
import {useAtomValue} from 'jotai';
import {companiesDataAtom} from './atoms';

export default function Home() {
  const companiesData = useAtomValue(companiesDataAtom);

  return (
    <div className="p-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold py-16">Apex hub</h1>
      {companiesData.map((company: CompanyData) => (
        <Link
          key={company.id}
          href={`/${company.slug}`}
          className="w-fit p-4 bg-blue-100 hover:bg-blue-300"
        >
          {company.name}
        </Link>
      ))}
      <div className="flex gap-4">
        <Link href="/login" className="p-4 bg-slate-50 hover:bg-slate-200">
          Login
        </Link>
        <Link href="/signup" className="p-4 bg-slate-50 hover:bg-slate-200">
          Signup
        </Link>
        <Link href="/dashboard" className="p-4 bg-green-50 hover:bg-green-200">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
