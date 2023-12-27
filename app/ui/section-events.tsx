'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import type {SwiperClass} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconButton} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import EventCard from './event-card';
import {useAtomValue} from 'jotai';
import type { EventData } from '@/app/lib/definitions';
import {allEventsDataAtom, horizontalPaddingAtom} from '@/app/atoms';
import getScreenSizes from '@/app/lib/getScreenSizes';
import useWindowSize from '@/app/lib/useWidowSize';

import 'swiper/css';

const styledIconButton = {
  color: '#222C28',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#BFCDC7'
  },
  '&.Mui-disabled': {
    backgroundColor: '#E8EBEA'
  }
};

const themes: Map<
  string,
  {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
  }
> = new Map([
  [
    'light',
    {
      backgroundColor: 'bg-gray-10',
      textColor: 'text-gray-90',
      linkColor: 'text-gray-80'
    }
  ],
  [
    'dark',
    {
      backgroundColor: 'bg-blue-95',
      textColor: 'text-white',
      linkColor: 'text-white'
    }
  ]
]);

export default function SectionEvents({theme = 'light'}: {theme?: string}) {
  const {companySlug} = useParams<{companySlug: string}>();
  const allEventsData = useAtomValue(allEventsDataAtom);
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);
  const eventsData = allEventsData.get(companySlug) as EventData[];

  // TODO: Show only soon and open events
  //const openEvents = eventsData.filter(e => e.status !== 'closed');
  const openEvents = eventsData;

  const screenSizes = getScreenSizes();
  const windowSize = useWindowSize();

  const getSlidesPerView = (): number =>
    windowSize < parseInt(screenSizes.xl) ? (windowSize < parseInt(screenSizes.md) ? 1 : 2) : 3;

  const swiperRef = useRef<SwiperClass>();
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(true);

  useEffect(() => {
    setRightButtonDisabled(openEvents.length <= getSlidesPerView());
  }, [windowSize, openEvents]);

  const handleClickSlideLeft = () => {
    swiperRef.current?.slidePrev();
  };

  const handleClickSlideRight = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setLeftButtonDisabled(swiper.isBeginning);
    setRightButtonDisabled(swiper.isEnd);
  };

  return (
    <section
      className={`${horizontalPadding} w-full relative py-6 h-full ${
        themes.get(theme)?.backgroundColor
      }`}
    >
      <div className="w-full flex flex-col sm:flex-row py-8">
        <p
          className={`pr-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium ${
            themes.get(theme)?.textColor
          }`}
        >
          Confira os próximos eventos
        </p>
        <div className="flex pt-7 sm:pt-0 justify-between flex-1">
          <Link
            className={`flex gap-2 items-center text-lg font-medium ${
              themes.get(theme)?.linkColor
            }`}
            href={`/${companySlug}/events`}
          >
            <span>Ver todos</span>
            <ChevronRightIcon sx={{width: '16px', height: '16px'}} />
          </Link>
          <div className="flex gap-4">
            <IconButton
              onClick={handleClickSlideLeft}
              disabled={leftButtonDisabled}
              sx={{...styledIconButton}}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleClickSlideRight}
              disabled={rightButtonDisabled}
              sx={{...styledIconButton}}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Swiper
        spaceBetween={8}
        slidesPerView={getSlidesPerView()}
        modules={[Navigation]}
        navigation
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
      >
        {openEvents.map((event, index) => (
          <SwiperSlide key={index} style={{display: 'flex', justifyContent: 'center'}}>
            <Link href={`/${companySlug}/events/${event.slug}`}>
              <EventCard eventData={event} theme={theme} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
