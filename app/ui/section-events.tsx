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

export default function SectionEvents() {
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
    <section className={`${horizontalPadding} w-full gap-8 relative py-6 h-full`}>
      <div className="w-full flex justify-between py-8">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">Confira os próximos eventos</p>
        <div className="self-center">
          <IconButton onClick={handleClickSlideLeft} disabled={leftButtonDisabled}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleClickSlideRight} disabled={rightButtonDisabled}>
            <ChevronRightIcon />
          </IconButton>
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
              <EventCard eventData={event} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
