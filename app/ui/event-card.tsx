import type {EventCard} from '@/app/lib/definitions';
import {Card, CardContent, CardMedia, Chip} from '@mui/material';
import {
  Event as EventIcon,
  SportsScore as SportsScoreIcon,
  PlaceOutlined as PlaceOutlinedIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import type {EventStatus} from '@/app/lib/utils';
import {statusMap} from '@/app/lib/utils';

const themes: Map<
  string,
  {
    backgroundColor: string;
    cardContentColor: string;
  }
> = new Map([
  [
    'light',
    {
      backgroundColor: 'hover:bg-gray-20',
      cardContentColor: 'text-gray-80'
    }
  ],
  [
    'dark',
    {
      backgroundColor: 'hover:bg-blue-60',
      cardContentColor: 'text-white'
    }
  ]
]);

export default function EventCard({
  eventData,
  theme = 'light'
}: {
  eventData: EventCard;
  theme?: string;
}) {
  const {
    name,
    starts_at: startDate,
    ends_at: endDate,
    banner_image: cardImage,
    address: {place, city, federal_unity: federalUnity},
    status
  } = eventData;
  const currentStatus = statusMap.get(status as EventStatus) || {
    text: 'Sem informações',
    color: 'customError'
  };
  const location = `${city} - ${federalUnity}`;

  return (
    <Card
      elevation={0}
      className={`p-4 max-w-[363px] ${themes.get(theme)?.backgroundColor}`}
      sx={{backgroundColor: 'transparent', borderRadius: '1.25rem'}}
    >
      <CardMedia component="img" height="188" image={cardImage} className="rounded-xl" />
      <CardContent sx={{paddingX: 0}}>
        <Chip
          label={currentStatus.text}
          color={theme === 'dark' ? `${currentStatus.color}Dark` : currentStatus.color}
          size="small"
          className="my-2"
        />
        <div className={`flex flex-col gap-2 ${themes.get(theme)?.cardContentColor}`}>
          <p className="text-xl">{name}</p>
          <div className="flex items-center gap-2">
            <EventIcon />
            {`${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(endDate).format('DD/MM/YYYY')}`}
          </div>
          <div className="flex items-center gap-2">
            <SportsScoreIcon />
            {place}
          </div>
          <div className="flex items-center gap-2">
            <PlaceOutlinedIcon />
            {location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
