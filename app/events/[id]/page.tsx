'use client';

import Image from 'next/image';
import {useAtomValue} from 'jotai';
import {horizontalPaddingAtom, eventsDataAtom} from '@/app/atoms';
import {Box, Button, Divider, Link} from '@mui/material';
import {
  Event as EventIcon,
  SportsScore as SportsScoreIcon,
  PlaceOutlined as PlaceOutlinedIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import Categories from '@/app/events/[id]/categories';
import {SectionEvents} from '@/app/ui';
import {
  EventStatus,
  categoryDescription,
  splitText,
  formatEnrollmentMessage
} from '@/app/lib/utils';
import useWindowSize from '@/app/lib/useWidowSize';
import getScreenSizes from '@/app/lib/getScreenSizes';

export default function EventPage({params: {id}}: {params: {id: string}}) {
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);
  const eventsData = useAtomValue(eventsDataAtom);

  const event = eventsData.find((event) => event.id === parseInt(id));

  const screenSizes = getScreenSizes();
  const windowSize = useWindowSize();

  // TODO: Replace with the real data
  if (!event) {
    return <h1 className={`w-full py-32 ${horizontalPadding}`}>Evento não disponível</h1>;
  }

  const {
    name,
    starts_at: startDate,
    ends_at: endDate,
    ticket_sales_opens_at: ticketStartDate,
    ticket_sales_closes_at: ticketEndDate,
    address: {place, city, federal_unity: federalUnity},
    banner_image: eventImage,
    description,
    schedule,
    status,
    categories,
    event_policy: eventPolicyLink
  } = event;
  const location = `${city} - ${federalUnity}`;

  return (
    <>
      <section className="w-full pt-8 sm:pt-12 lg:pt-16">
        <div
          className={`relative flex mx-auto max-w-screen-2xl max-h-[633px] my-12 ${horizontalPadding}`}
        >
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
            color="info.main"
            sx={{boxShadow: 2}}
          >
            {formatEnrollmentMessage(ticketStartDate, ticketEndDate)}
          </Box>
        </div>
        <div className="flex flex-col">
          <div className={`w-full relative lg:w-3/5 pb-10 flex flex-col ${horizontalPadding}`}>
            <div className="before:block before:lg:hidden before:absolute before:left-0 before:bottom-0 before:h-1/3 before:w-full before:bg-gray-10" />
            <h1 className="text-4xl py-6 font-medium">{name}</h1>
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
            {windowSize < parseInt(screenSizes.lg) && (
              <div className="relative">
                <div className="pt-8">
                  <Categories categories={categories} status={status as EventStatus} />
                </div>
              </div>
            )}
          </div>
          <div className={`flex gap-12 bg-gray-10 ${horizontalPadding}`}>
            <div className="flex flex-col gap-12 pt-4 lg:pt-12 py-12 w-full">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Descrição do evento</h2>
                <p>{description}</p>
              </div>
              <Divider className="bg-gray-200" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Programação</h2>
                <div className="flex flex-col gap-2">
                  {splitText(schedule).map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              </div>
              <Divider className="bg-gray-200" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Categorias disponíveis</h2>
                <div className="flex flex-col gap-2">
                  {categories.map(({name, minimum_age, maximum_age}, index) => (
                    <p key={index}>{`${name} - ${categoryDescription(
                      minimum_age,
                      maximum_age
                    )}`}</p>
                  ))}
                </div>
              </div>
              <Divider className="bg-gray-200" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Política do evento</h2>
                <div className="flex flex-col">
                  <p>
                    Confira aqui os{' '}
                    <Link href={eventPolicyLink}>documentos necessários para participação</Link>
                  </p>
                </div>
              </div>
              <Divider className="bg-gray-200" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Local</h2>
                <div className="flex flex-col gap-2">
                  <p>{name}</p>
                  <p>{location}</p>
                </div>
                <Button
                  className="h-fit"
                  variant="outlined"
                  color="info"
                  startIcon={<PlaceOutlinedIcon style={{fontSize: '16px'}} />}
                >
                  Ver no mapa
                </Button>
              </div>
            </div>
            {windowSize >= parseInt(screenSizes.lg) && (
              <div className="w-2/3 -mt-24">
                <div className="sticky top-24 pb-12">
                  <Categories categories={categories} status={status as EventStatus} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <SectionEvents theme="dark" />
    </>
  );
}
