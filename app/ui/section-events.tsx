'use client';

import {useRef, useState} from 'react';
import type {SwiperClass} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Box, IconButton} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import EventCard from './event-card';

import 'swiper/css';

import {placeholderSlideData} from '@/app/lib/placeholder-data.js';

const SLIDES_PER_VIEW = 3;

export default function SectionEvents() {
  const swiperRef = useRef<SwiperClass>();
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);

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
    <Box
      component={'section'}
      className="w-full gap-28 relative px-16"
      sx={{
        height: '580px',
        backgroundColor: '#fff'
      }}
    >
      <Box
        width={'100%'}
        display={'flex'}
        padding={'16px 0 32px 0'}
        justifyContent={'space-between'}
      >
        <p className="text-black text-4xl">Confira os próximos eventos</p>
        <Box alignSelf="center" paddingRight={'32px'}>
          <IconButton
            onClick={handleClickSlideLeft}
            disabled={leftButtonDisabled}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleClickSlideRight}
            disabled={rightButtonDisabled}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Swiper
        spaceBetween={8}
        slidesPerView={SLIDES_PER_VIEW}
        modules={[Navigation]}
        navigation
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
      >
        {placeholderSlideData.map((event, index) => (
          <SwiperSlide key={index}>
            <EventCard eventInfo={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
