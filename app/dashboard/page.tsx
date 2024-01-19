import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col p-16">
      <h1>Protected dashboard page</h1>
      <Link href={`/logout?callbackUrl=/`} className="p-2 border-2 w-fit">
        Logout
      </Link>
    </div>
  );
}
