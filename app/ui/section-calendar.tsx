import {Box, Button} from '@mui/material';
import Image from 'next/image';

// TODO: Use the primary color coming from the store state
const primaryColor: string = '#072342';

export default function SectionCalendar() {
  return (
    <Box
      component={'section'}
      className="w-full h-[480px] relative flex items-center justify-center"
      sx={{
        backgroundColor: '#fff',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '10%',
          backgroundColor: primaryColor
        }
      }}
    >
      <div className="w-full px-8 z-10">
        <Image
          className="rounded-3xl object-cover object-center"
          src="/section4_image.jpg"
          alt="calendar image"
          width={0}
          height={0}
          sizes="100vw"
          style={{width: '100%', height: '466px'}}
        />
      </div>
      <div className="absolute top-8 left-8 ml-8 w-[498px] rounded-lg flex flex-col gap-4 z-10 bg-[rgba(255,255,255,0.4)] backdrop-blur-lg py-8 px-6">
        <Box component="p" className="text-3xl" sx={{color: primaryColor}}>
          Agende dias e horários para corridas de Kart Indoor
        </Box>
        <Button variant="outlined" sx={{color: primaryColor, width: 'fit-content'}}>
          Ver Calendário
        </Button>
      </div>
    </Box>
  );
}
