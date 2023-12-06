'use client';

import {useRef, useState} from 'react';
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
import {templateDataAtom} from '@/app/atoms';

import 'swiper/css';

const SLIDES_PER_VIEW = 3;

export default function SectionEvents() {
  const templateData = useAtomValue(templateDataAtom);
  const {last_events: lastEvents} = templateData;

  const swiperRef = useRef<SwiperClass>();
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(
    lastEvents.length <= SLIDES_PER_VIEW
  );

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
    <section className="w-full gap-8 relative py-6 px-16 h-full bg-white">
      <div className="w-full flex justify-between py-8">
        <p className="text-black text-4xl">Confira os próximos eventos</p>
        <div className="self-center pr-8">
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
        slidesPerView={SLIDES_PER_VIEW}
        modules={[Navigation]}
        navigation
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
      >
        {lastEvents.map((event, index) => (
          <SwiperSlide key={index}>
            <EventCard eventData={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
