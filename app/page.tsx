import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-screen relative">
        <Image
          src="/images/landing.svg"
          alt="Landing page"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </main>
  )
}
