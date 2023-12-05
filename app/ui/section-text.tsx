'use client';

import {Autoplay, EffectFade} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Box} from '@mui/material';
import Image from 'next/image';
import {useAtomValue} from 'jotai';
import {templateDataAtom} from '@/app/store';

import 'swiper/css';
import 'swiper/css/effect-fade';

// TODO: Use the primary color coming from the store state
const primaryColor: string = '#072342';

const slideshowImages = [
  '/slideshow1.jpg',
  '/slideshow2.jpg',
  '/slideshow3.jpg'
];

const slideshowText = [
  'Paixão pela velocidade, gosto pelo convívio em ambientes altamente competitivos e a busca pela excelência naquilo que faz são algumas das características que fazem o sucesso da TECHSPEED, líder de mercado na produção e comercialização de chassis, equipamentos e acessórios destinados à competição de karts no Brasil.',
  'A empresa tem como missão levar ao consumidor final o melhor produto do mercado a um preço justo e competitivo. Seus gestores e funcionários estão altamente motivados e compromissados em fabricar no Brasil equipamentos de padrão europeu, tanto em performance como em qualidade. Os produtos fabricados pela TECHSPEED são diferenciados e com padrão de qualidade reconhecidamente refinado.',
  'Buscamos implementar soluções incessantemente inovadoras, graças à manutenção de uma equipe de técnicos e engenheiros do mais alto nível. Um dos fatores que promovem o sucesso da TECHSPEED está no processo de pesquisa e desenvolvimento tecnológico, claramente evidenciados em todas as ações de lançamento de novos produtos.'
];

export default function SectionText() {
  const templateData = useAtomValue(templateDataAtom);

  console.log('from sectiontext', templateData);

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
        {slideshowText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </Box>
  );
}
