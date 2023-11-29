import type {EventCardInfo} from '@/app/lib/definitions';
import {Card, CardContent, CardMedia, Chip, Typography} from '@mui/material';
import {
  Event as EventIcon,
  SportsScore as SportsScoreIcon,
  PlaceOutlined as PlaceOutlinedIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';

enum EventStatus {
  Active = 'active',
  Soon = 'soon',
  Canceled = 'canceled'
}

type EventStatusInfo = {
  text: string;
  color: 'success' | 'warning' | 'error';
};

const statusMap = new Map<EventStatus, EventStatusInfo>([
  [EventStatus.Active, {text: 'Inscrições abertas', color: 'success'}],
  [EventStatus.Soon, {text: 'Em breve', color: 'warning'}],
  [EventStatus.Canceled, {text: 'Cancelado', color: 'error'}]
]);

export default function EventCard({eventInfo}: {eventInfo: EventCardInfo}) {
  const {cardImagePath, status, title, startDate, endDate, event, location} =
    eventInfo;
  const currentStatus = statusMap.get(status as EventStatus) || {
    text: 'Desconhecido',
    color: 'error'
  };

  return (
    <Card
      elevation={0}
      className="p-4 max-w-[363px] self-start rounded-2xl bg-transparent hover:bg-gray-200"
    >
      <CardMedia
        component="img"
        height="188"
        image={cardImagePath}
        className="rounded-xl"
      />
      <CardContent className="p-0">
        <Chip
          label={currentStatus.text}
          color={currentStatus.color}
          size="small"
          className="my-2"
        />
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <EventIcon />
            {`${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(
              endDate
            ).format('DD/MM/YYYY')}`}
          </div>
          <div className="flex items-center gap-2">
            <SportsScoreIcon />
            {event}
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
