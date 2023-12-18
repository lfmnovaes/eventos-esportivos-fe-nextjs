'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
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
import {templateDataAtom, horizontalPaddingAtom} from '@/app/atoms';
import getScreenSizes from '@/app/lib/getScreenSizes';
import useWindowSize from '@/app/lib/useWidowSize';

import 'swiper/css';

const styledIconButton = {
  color: '#222C28',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#BFCDC7',
  },
  '&.Mui-disabled': {
    backgroundColor: '#E8EBEA'
  }
};

export default function SectionEvents({theme = 'light'}: {theme?: string}) {
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);
  const templateData = useAtomValue(templateDataAtom);
  const {last_events: lastEvents} = templateData;

  const screens = getScreenSizes();
  const windowSize = useWindowSize();

  const getSlidesPerView = (): number =>
    windowSize < parseInt(screens.xl) ? (windowSize < parseInt(screens.md) ? 1 : 2) : 3;

  const swiperRef = useRef<SwiperClass>();
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(true);

  useEffect(() => {
    setRightButtonDisabled(lastEvents.length <= getSlidesPerView());
  }, [windowSize, lastEvents]);

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
        theme === 'dark' ? 'bg-blue-95' : 'bg-gray-10'
      }`}
    >
      <div className="w-full flex flex-col sm:flex-row py-8">
        <p
          className={`pr-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-90'
          }`}
        >
          Confira os próximos eventos
        </p>
        <div className="flex pt-7 sm:pt-0 justify-between flex-1">
          <Link
            className={`flex gap-2 items-center text-lg font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-80'
            }`}
            href={'/events'}
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
        {lastEvents.map((event, index) => (
          <SwiperSlide key={index} style={{display: 'flex', justifyContent: 'center'}}>
            <Link href={`/events/${event.id}`}>
              <EventCard eventData={event} theme={theme} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
