'use client';

import {Autoplay, EffectFade} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Box} from '@mui/material';
import Image from 'next/image';
import {useAtomValue} from 'jotai';
import {templateDataAtom} from '@/app/atoms';

import 'swiper/css';
import 'swiper/css/effect-fade';

const slideshowImages = [
  '/slideshow1.jpg',
  '/slideshow2.jpg',
  '/slideshow3.jpg'
];

export default function SectionText() {
  const templateData = useAtomValue(templateDataAtom);

  const {primary_color: primaryColor, description} = templateData;

  const slideshowTexts = description.split('\r\n').filter((text) => text);

  return (
    <Box
      component={'section'}
      className="w-full flex items-center gap-28 relative px-16"
      sx={{
        height: '580px',
        backgroundColor: '#fff',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundColor: primaryColor,
          clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)'
        }
      }}
    >
      <Box
        className="container w-1/2 overflow-hidden rounded-3xl border-4"
        sx={{borderColor: primaryColor}}
      >
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          modules={[Autoplay, EffectFade]}
          effect="fade"
        >
          {slideshowImages.map((image, index) => (
            <SwiperSlide className="bg-white" key={index}>
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{width: '100%', height: 'auto'}}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <div className="container flex flex-col w-1/2 gap-6 text-black">
        {slideshowTexts.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </Box>
  );
}
