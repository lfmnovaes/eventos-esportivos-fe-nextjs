'use client';

import {useAtomValue} from 'jotai';
import {horizontalPaddingAtom, eventsDataAtom} from '@/app/atoms';
import {Divider, MenuItem, Select} from '@mui/material';
import {
  SearchOutlined as SearchOutlinedIcon,
  SwapHoriz as SwapHorizIcon
} from '@mui/icons-material';
import CustomTextField from '@/app/ui/components/text-field';
import EventCard from '@/app/ui/event-card';
import Link from 'next/link';

export default function EventsPage() {
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);
  const eventsData = useAtomValue(eventsDataAtom);

  // TODO: implement the filter based onChange value in select
  const filteredEvents = eventsData;

  return (
    <section
      className={`w-full flex flex-col gap-4 mt-8 pt-16 ${horizontalPadding}`}
    >
      <div className="flex justify-between">
        <h1 className="flex text-4xl font-medium">Todos os eventos</h1>
        <CustomTextField label="Buscar por evento" startIcon={<SearchOutlinedIcon />} />
      </div>
      <Divider className="bg-gray-200" />
      <div className="flex justify-between pt-11">
        <div className="grid grid-cols-2 grid-rows-2 gap-x-8 w-[440px]">
          <span className="">Estado selecionado</span>
          <span className="">Selecionar período</span>
          <Select id="select-filter-district" value="all" size="small">
            <MenuItem value="all">Todos os estados</MenuItem>
            <MenuItem value="sc">SC</MenuItem>
            <MenuItem value="pr">PR</MenuItem>
            <MenuItem value="sp">SP</MenuItem>
          </Select>
          <Select id="select-filter-period" value="all" size="small">
            <MenuItem value="all">Todos os períodos</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
          </Select>
        </div>
        <span>
          Ordenar por <SwapHorizIcon />
        </span>
      </div>
      <span className="py-2">Exibindo todos os resultados</span>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-10">
        {filteredEvents.map((event, index) => (
          <Link key={index} href={`/events/${event.id}`}>
            <EventCard eventData={event} />
          </Link>
        ))}
      </div>
    </section>
  );
}
