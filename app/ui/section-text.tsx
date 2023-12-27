'use client';

import type {HomeTemplate} from '@/app/lib/definitions';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import {useAtomValue} from 'jotai';
import {Autoplay, EffectFade} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Box} from '@mui/material';
import {horizontalPaddingAtom, allTemplateDataAtom} from '@/app/atoms';
import {splitText} from '@/app/lib/utils';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function SectionText() {
  const {companySlug} = useParams<{companySlug: string}>();
  const allCompaniesTemplateData = useAtomValue(allTemplateDataAtom);
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);

  const companyTemplateData = allCompaniesTemplateData.get(companySlug) as HomeTemplate;
  const {
    primary_color: primaryColor,
    description,
    gallery_images: galleryImages
  } = companyTemplateData;

  const slideshowTexts = splitText(description);

  return (
    <Box
      component={'section'}
      className={`${horizontalPadding} w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-28 relative py-12 md:py-16 lg:py-20`}
      sx={{
        backgroundColor: '#fff',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundColor: primaryColor,
          clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }
      }}
    >
      <Box
        className="order-last md:order-first w-full md:w-1/2 overflow-hidden rounded-3xl border-4 aspect-video max-w-[746px] max-h-[420px] mx-auto"
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
          {galleryImages.map((gallery, index) => (
            <SwiperSlide className="bg-white" key={index}>
              <Image
                src={gallery.image}
                alt={`Slide ${index + 1}`}
                width={617}
                height={422}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <div className="flex flex-col w-full md:w-1/2 gap-6 text-black">
        {slideshowTexts.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </Box>
  );
}
