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
  [EventStatus.Closed, {text: 'Evento encerrado', color: 'customError'}],
  [EventStatus.NoTicketsRemaining, {text: 'Esgotado', color: 'customError'}]
]);

export const getDomainName = (url: string): string => new URL(url).hostname.replace(/^www\./, '');

export const formatBrazilianPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.length === 13 && phoneNumber.startsWith('+55')
    ? `(${phoneNumber.slice(3, 5)}) ${phoneNumber.slice(5, 9)}-${phoneNumber.slice(9, 13)}`
    : '';

export const splitText = (text: string | null | undefined): string[] => {
  if (text == null || typeof text !== 'string') return [];

  return text.split('\r\n').filter((e) => e);
};

export const categoryDescription = (
  minimumAge: number,
  maximumAge: number | null | undefined
): string =>
  maximumAge === null
    ? `A partir de ${minimumAge} anos de idade`
    : `${minimumAge} a ${maximumAge} anos de idade`;

export const formatEnrollmentMessage = (
  salesStartDate?: string,
  salesEndDate?: string,
  status?: string
): string => {
  if (!salesStartDate || !salesEndDate || !status) return 'Informações do evento não disponíveis';

  const now = dayjs();
  const start = dayjs(salesStartDate).utc();
  const end = dayjs(salesEndDate).utc();

  const statusMessages = new Map<EventStatus, () => string>([
    [
      EventStatus.Open,
      () =>
        now.isAfter(end)
          ? 'Inscrições esgotadas'
          : `Inscrições até ${end.format('DD/MM/YYYY [às] HH:mm')}`
    ],
    [EventStatus.OpenSoon, () => `Inscrições abrirão ${start.format('DD/MM/YYYY [às] HH:mm')}`],
    [EventStatus.Closed, () => 'Evento encerrado'],
    [EventStatus.NoTicketsRemaining, () => 'Inscrições esgotadas']
  ]);

  const validStatus = Object.values(EventStatus).includes(status as EventStatus)
    ? (status as EventStatus)
    : EventStatus.Closed;

  const eventMessage = statusMessages.get(validStatus);
  return eventMessage ? eventMessage() : 'Status do evento não definido';
};

export function capitalizeFirstLetter(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}
