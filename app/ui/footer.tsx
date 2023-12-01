import {Box, Divider, Grid, IconButton, Link, Typography} from '@mui/material';
import {
  PlaceOutlined as PlaceOutlinedIcon,
  LanguageOutlined as LanguageOutlinedIcon,
  PhoneInTalk as PhoneInTalkIcon, //TODO: Fix error when using it
  FacebookOutlined as FacebookOutlinedIcon, // TODO: Fix error when using it
  Instagram as InstagramIcon
} from '@mui/icons-material';

// TODO: Use the primary color coming from the store state
const primaryColor: string = '#072342';

export default function Footer() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      paddingY={'2rem'}
      paddingX={'4rem'}
      sx={{
        backgroundColor: primaryColor
      }}
    >
      <Grid container direction="row" alignItems="flex-start">
        <Grid item xs={4} display={'grid'} gap={'16px'}>
          <Box component={'img'} src={'/logo.png'} />
          <Typography color="white" variant="body1">
            {'Onde estamos'}
          </Typography>
          <Box display={'flex'} gap={'8px'}>
            <PlaceOutlinedIcon
              sx={{height: '16px', width: '16px', color: 'white'}}
            />
            <Typography color="white" variant="body2">
              {'Av. Centenário, nº 500 Pinheirinho'}
              <br />
              {'Criciúma, SC - 88804-000'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} display={'grid'} gap={'16px'}>
          <Typography color={'white'} variant={'body2'}>
            {'Acesse nosso site'}
          </Typography>
          <Box display={'flex'} gap={'8px'}>
            <LanguageOutlinedIcon
              sx={{height: '16px', width: '16px', color: 'white'}}
            />
            <Link href="techspeedkart.com" target="_blank" rel="noopener">
              <Typography color={'white'} variant={'body2'}>
                {'techspeedkart.com'}
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={2} display={'grid'} gap={'16px'}>
          <Typography color={'white'} variant={'body2'}>
            {'Fale conosco'}
          </Typography>
          <Box display={'flex'} gap={'8px'}>
            <InstagramIcon
              sx={{height: '16px', width: '16px', color: 'white'}}
            />
            <Link href="tel:4834374488" target="_blank" rel="noopener">
              <Typography color={'white'} variant={'body2'}>
                {'(48) 3437-4488'}
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={2} display={'grid'} gap={'16px'}>
          <Typography variant={'body2'} color={'white'}>
            {'Nossas redes sociais'}
          </Typography>
          <Box display={'flex'} gap={'16px'}>
            <IconButton sx={{width: 'fit-content', padding: 0}}>
              <InstagramIcon
                sx={{height: '32px', width: '32px', color: 'white'}}
              />
            </IconButton>
            <IconButton sx={{width: 'fit-content', padding: 0}}>
              <InstagramIcon
                sx={{height: '32px', width: '32px', color: 'white'}}
              />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={2} sx={{alignSelf: 'flex-end'}}>
          <Link href="https://www.google.com/" target="_blank" rel="noopener">
            <Typography variant={'body2'} color={'white'}>
              {'Termos e políticas'}
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Divider color={'white'} sx={{marginY: '1rem'}} />
      <Box display={'flex'} alignSelf={'center'} gap={'8px'}>
        <Typography variant={'body2'} color={'white'}>
          {'Powered by '}
        </Typography>
        <Box component={'img'} src={'/logo_plathanus.png'}></Box>
      </Box>
    </Box>
  );
}
