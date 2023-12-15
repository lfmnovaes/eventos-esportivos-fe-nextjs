import type {EventCard} from '@/app/lib/definitions';
import {Card, CardContent, CardMedia, Chip} from '@mui/material';
import {
  Event as EventIcon,
  SportsScore as SportsScoreIcon,
  PlaceOutlined as PlaceOutlinedIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';

enum EventStatus {
  Open = 'open',
  Closed = 'closed',
  OpenSoon = 'open_soon',
  NoTicketsRemaining = 'no_tickets_remaining'
}

type EventStatusInfo = {
  text: string;
  color: 'success' | 'warning' | 'error' | 'info';
};

const statusMap = new Map<EventStatus, EventStatusInfo>([
  [EventStatus.Open, {text: 'Inscrições abertas', color: 'success'}],
  [EventStatus.OpenSoon, {text: 'Em breve', color: 'warning'}],
  [EventStatus.Closed, {text: 'Fechado', color: 'error'}],
  [EventStatus.NoTicketsRemaining, {text: 'Esgotado', color: 'info'}]
]);

export default function EventCard({eventData}: {eventData: EventCard}) {
  const {
    name,
    starts_at: startDate,
    ends_at: endDate,
    banner_image: cardImage,
    address: {place, city, federal_unity: federalUnity},
    status
  } = eventData;
  const currentStatus = statusMap.get(status as EventStatus) || {
    text: 'Desconhecido',
    color: 'error'
  };
  const location = `${city} - ${federalUnity}`;

  return (
    <Card
      elevation={0}
      className="p-4 max-w-[363px] hover:bg-gray-200"
      sx={{backgroundColor: '#F7F7F7', borderRadius: '1.25rem'}}
    >
      <CardMedia
        component="img"
        height="188"
        image={cardImage}
        className="rounded-xl"
      />
      <CardContent className="p-0">
        <Chip
          label={currentStatus.text}
          color={currentStatus.color}
          size="small"
          className="my-2"
        />
        <div className="flex flex-col gap-2">
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
