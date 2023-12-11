'use client';

import {templateDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';

export default function EventPage({params: {id}}: {params: {id: string}}) {
  const templateData = useAtomValue(templateDataAtom);
  const {last_events: lastEvents} = templateData;

  const event = lastEvents.find((event) => event.id === parseInt(id));

  if (!event) {
    return <h1>Event not found</h1>;
  }

  return (
    <div>
      <h1>Event Page</h1>
      <p>{event.name}</p>
    </div>
  );
}
