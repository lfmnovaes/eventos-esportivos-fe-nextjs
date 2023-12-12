'use client';

import {templateDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';
import Image from 'next/image';

export default function EventPage({params: {id}}: {params: {id: string}}) {
  const templateData = useAtomValue(templateDataAtom);
  const {last_events: lastEvents} = templateData;

  const event = lastEvents.find((event) => event.id === parseInt(id));

  if (!event) {
    return <h1>Event not found</h1>;
  }

  return (
    <section className="w-full flex justify-center py-24 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="w-full flex max-h-[633px] max-w-screen-2xl overflow-hidden rounded-3xl">
        <Image
          src="/event-image.jpg"
          alt="Event image"
          width={1222}
          height={633}
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%'
          }}
        />
      </div>
    </section>
  );
}
