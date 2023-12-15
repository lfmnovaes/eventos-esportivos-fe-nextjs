'use client';

import Image from 'next/image';
import {useAtomValue} from 'jotai';
import {templateDataAtom, horizontalPaddingAtom} from '@/app/atoms';
import {Box, Button, Checkbox, Divider, Link} from '@mui/material';
import {
  Event as EventIcon,
  SportsScore as SportsScoreIcon,
  PlaceOutlined as PlaceOutlinedIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import {initialEventData} from '@/app/lib/mock-data';
import {SectionEvents} from '@/app/ui';

export default function EventPage({params: {id}}: {params: {id: string}}) {
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);
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

  if (!event) {
    return <h1 className={`w-full py-32 ${horizontalPadding}`}>Evento não disponível</h1>;
  }

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
            {enrollmentMessage}
          </Box>
        </div>
        <div className="flex flex-col">
          <div className={`w-full lg:w-3/5 pb-10 flex flex-col ${horizontalPadding}`}>
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
          </div>
          <div className={`flex gap-12 bg-gray-100 ${horizontalPadding}`}>
            <div className="flex flex-col gap-12 py-12 w-full">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Descrição do evento</h2>
                <p>{description}</p>
              </div>
              <Divider className="bg-gray-200" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Programação</h2>
                <div className="flex flex-col gap-2">
                  {schedule.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              </div>
              <Divider className="bg-gray-200" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Categorias disponíveis</h2>
                <div className="flex flex-col gap-2">
                  {categories.map(({name, description}, index) => (
                    <p key={index}>{`${name} - ${description}`}</p>
                  ))}
                </div>
              </div>
              <Divider className="bg-gray-200" />
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl">Política do evento</h2>
                <div className="flex flex-col">
                  <p>
                    Confira aqui os <Link href="#">documentos necessários para participação</Link>
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
                  variant="outlined"
                  color="info"
                  startIcon={<PlaceOutlinedIcon style={{fontSize: '16px'}} />}
                  sx={{width: 'fit-content'}}
                >
                  Ver no mapa
                </Button>
              </div>
            </div>
            <div className="hidden lg:block w-2/3 -mt-24">
              <div className="sticky top-24 pb-12">
                <Box className="bg-white rounded-2xl" sx={{boxShadow: 3}}>
                  <div className="flex flex-col p-6 gap-6">
                    <h2 className="text-2xl">Categorias</h2>
                    <div className="flex flex-col gap-4">
                      {categories.map(({name, description, price}, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="flex">
                            <Checkbox disabled />
                            <div>
                              <p>{name}</p>
                              <p className="text-sm">{description}</p>
                            </div>
                          </div>
                          <span>{price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Divider className="bg-gray-200" />
                  <div className="flex justify-center p-8">
                    <p className="text-lg">Inscrições em breve</p>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionEvents />
    </>
  );
}
