import {Box, Button} from '@mui/material';

// TODO: Use the primary color coming from the store state
const primaryColor: string = '#072342';

export default function SectionCalendar() {
  return (
    <Box
      height={'480px'}
      width={'100%'}
      position={'relative'}
      display={'flex'}
      justifyContent={'center'}
      alignContent={'center'}
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
      <Box
        height={'466px'}
        width={'90%'}
        component={'img'}
        src={'/section4_image.jpg'}
        borderRadius={'32px'}
        zIndex={'5'}
        sx={{objectFit: 'cover'}}
      />
      <Box
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        width={'434px'}
        borderRadius={'16px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
        zIndex={'10'}
        sx={{
          top: '32px',
          left: 'calc(5% + 32px)',
          color: 'var(--default-color)',
          backdropFilter: 'blur(16px)',
          paddingY: '32px',
          paddingX: '24px'
        }}
      >
        <p>Agende dias e horários para corridas de Kart Indoor</p>
        <Button variant="outlined" sx={{width: 'fit-content'}}>
          Ver Calendário
        </Button>
      </Box>
    </Box>
  );
}
