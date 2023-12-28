import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type {EventStatusInfo} from '@/app/lib/definitions';

dayjs.extend(utc);

export enum EventStatus {
  Open = 'open',
  Closed = 'closed',
  OpenSoon = 'open_soon',
  NoTicketsRemaining = 'no_tickets_remaining'
}

export const statusMap = new Map<EventStatus, EventStatusInfo>([
  [EventStatus.Open, {text: 'Inscrições abertas', color: 'success'}],
  [EventStatus.OpenSoon, {text: 'Em breve', color: 'warning'}],
  [EventStatus.Closed, {text: 'Evento encerrado', color: 'error'}],
  [EventStatus.NoTicketsRemaining, {text: 'Esgotado', color: 'error'}]
]);

export const getDomainName = (url: string): string => new URL(url).hostname.replace(/^www\./, '');

export const formatBrazilianPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.length === 13 && phoneNumber.startsWith('+55')
    ? `(${phoneNumber.slice(3, 5)}) ${phoneNumber.slice(5, 9)}-${phoneNumber.slice(9, 13)}`
    : '';

export const splitText = (text: string): string[] => text.split('\r\n').filter((e) => e);

export const categoryDescription = (minimumAge: number, maximumAge: number | null): string =>
  maximumAge === null
    ? `A partir de ${minimumAge} anos de idade`
    : `${minimumAge} a ${maximumAge} anos de idade`;

export const formatEnrollmentMessage = (salesStartDate: string, salesEndDate: string): string => {
  const now = dayjs();
  const start = dayjs(salesStartDate).utc();
  const end = dayjs(salesEndDate).utc();

  if (now.isAfter(end)) {
    return 'Inscrições esgotadas';
  } else if (now.isBefore(start)) {
    return `Inscrições abrirão ${start.format('DD/MM/YYYY [às] HH:mm')}`;
  } else {
    return `Inscrições até ${end.format('DD/MM/YYYY [às] HH:mm')}`;
  }
};

export function capitalizeFirstLetter(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}
