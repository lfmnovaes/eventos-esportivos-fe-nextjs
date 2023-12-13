'use client';

import Image from 'next/image';
import {templateDataAtom} from '@/app/atoms';
import {useAtomValue} from 'jotai';
import {Box, Button, Divider, Link} from '@mui/material';
import {
  Event as EventIcon,
  SportsScore as SportsScoreIcon,
  PlaceOutlined as PlaceOutlinedIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';

import {initialEventData} from '@/app/lib/mock-data';
import {SectionEvents} from '@/app/ui';

export default function EventPage({params: {id}}: {params: {id: string}}) {
  const templateData = useAtomValue(templateDataAtom);
  const {last_events: lastEvents} = templateData;

  const event = lastEvents.find((event) => event.id === parseInt(id));

  // TODO: Replace with the real data
  const {
    name,
    starts_at: startDate,
    ends_at: endDate,
    address: {place, city, federal_unity: federalUnity},
    banner_image: eventImage,
    enrollment_message: enrollmentMessage,
    description,
    schedule,
    categories
  } = initialEventData[0];
  const location = `${city} - ${federalUnity}`;

  const horizontalPadding = 'px-4 sm:px-8 md:px-12 lg:px-16';

  if (!event) {
    return <h1 className={`w-full py-32 ${horizontalPadding}`}>Evento não disponível</h1>;
  }

  return (
    <>
      <section className={`w-full max-w-screen-2xl flex flex-col py-16 ${horizontalPadding}`}>
        <div className="relative w-full flex max-h-[633px] my-12">
          <Image
            src={eventImage}
            alt="Event image"
            width={1222}
            height={633}
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              borderRadius: '1.5rem'
            }}
          />
          <Box
            className="absolute -bottom-8 py-2 sm:py-4 md:py-6 px-4 sm:px-8 md:px-12 bg-white text-center rounded-2xl left-1/2 -translate-x-1/2 text-xs sm:text-sm md:text-base"
            sx={{boxShadow: 2}}
          >
            {enrollmentMessage}
          </Box>
        </div>
        <div className="w-full pb-10 flex flex-row">
          <div className="w-1/2">
            <h1 className="text-4xl py-6">Campeonato Gaúcho - Tarumã</h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <EventIcon />
                {`${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(endDate).format(
                  'DD/MM/YYYY'
                )}`}
              </div>
              <div className="flex items-center gap-2">
                <SportsScoreIcon />
                {place}
              </div>
              <div className="flex items-center gap-2">
                <PlaceOutlinedIcon />
                {location}
              </div>
            </div>
          </div>
          <aside>
            <div className="sticky top-24 right-12 self-end z-10">
              <div className="p-4 bg-white rounded shadow-md">
                <p>Sticky content</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className={`w-full bg-gray-100 ${horizontalPadding}`}>
        <div className="flex flex-col gap-12 py-12">
          <div className="flex flex-col gap-6 w-1/2">
            <h2 className="text-2xl">Descrição do evento</h2>
            <p>{description}</p>
          </div>
          <Divider className="bg-gray-200 w-1/2" />
          <div className="flex flex-col gap-6 w-1/2">
            <h2 className="text-2xl">Programação</h2>
            <div className="flex flex-col gap-2">
              {schedule.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
          <Divider className="bg-gray-200 w-1/2" />
          <div className="flex flex-col gap-6 w-1/2">
            <h2 className="text-2xl">Categorias disponíveis</h2>
            <div className="flex flex-col gap-2">
              {categories.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
          <Divider className="bg-gray-200 w-1/2" />
          <div className="flex flex-col gap-6 w-1/2">
            <h2 className="text-2xl">Política do evento</h2>
            <div className="flex flex-col">
              <p>
                Confira aqui os <Link href="#">documentos necessários para participação</Link>
              </p>
            </div>
          </div>
          <Divider className="bg-gray-200 w-1/2" />
          <div className="flex flex-col gap-6 w-1/2">
            <h2 className="text-2xl">Local</h2>
            <div className="flex flex-col gap-2">
              <p>{name}</p>
              <p>{location}</p>
            </div>
            <Button
              variant="outlined"
              color="info"
              startIcon={<PlaceOutlinedIcon style={{fontSize: '16px'}} />}
              sx={{width: 'fit-content'}}
            >
              Ver no mapa
            </Button>
          </div>
        </div>
      </section>
      <SectionEvents className={horizontalPadding} />
    </>
  );
}
