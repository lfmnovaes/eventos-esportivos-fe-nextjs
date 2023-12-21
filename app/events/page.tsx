'use client';

import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useAtomValue} from 'jotai';
import {
  horizontalPaddingAtom,
  eventsDataAtom,
  federalUnityParametersAtom,
  periodParametersAtom
} from '@/app/atoms';
import dayjs from 'dayjs';
import {Button, Divider, MenuItem, Select} from '@mui/material';
import {
  SearchOutlined as SearchOutlinedIcon,
  SwapHoriz as SwapHorizIcon,
  Event as EventIcon,
  PlaceOutlined as PlaceOutlinedIcon
} from '@mui/icons-material';
import CustomTextField from '@/app/ui/components/text-field';
import EventCard from '@/app/ui/event-card';

export default function EventsPage() {
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);
  const eventsData = useAtomValue(eventsDataAtom);
  const federalUnityParameters = useAtomValue(federalUnityParametersAtom);
  const periodParameters = useAtomValue(periodParametersAtom);

  const [selectedFederalUnity, setSelectedFederalUnity] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const filteredEvents = eventsData.filter((event) => {
    const eventStart = dayjs(event.starts_at);
    const isFederalUnityMatch =
      selectedFederalUnity === 'all' || event.address.federal_unity === selectedFederalUnity;
    const isPeriodMatch =
      selectedPeriod === 'all' || eventStart.isSame(dayjs(`${selectedPeriod}-01-01`), 'year');
    const isSearchMatch =
      !searchInput || event.name.toLowerCase().includes(searchInput.toLowerCase());
    return isFederalUnityMatch && isPeriodMatch && isSearchMatch;
  });

  const getFilterStatusMessage = () => {
    const filters = [
      selectedFederalUnity !== 'all' && (
        <>
          no estado <strong className="text-gray-80">{selectedFederalUnity}</strong>
        </>
      ),
      selectedPeriod !== 'all' && (
        <>
          em <strong className="text-gray-80">{selectedPeriod}</strong>
        </>
      ),
      searchInput && (
        <>
          para &quot;<strong className="text-gray-80">{searchInput}</strong>&quot;
        </>
      )
    ].filter(Boolean);

    if (filters.length === 0) {
      return 'Exibindo todos os resultados';
    }

    const combinedFilters = filters.reduce<ReactNode>(
      (acc, curr, index) => (
        <>
          {acc}
          {index > 0 ? ' ' : ''}
          {curr}
        </>
      ),
      <> </>
    );

    return <>Exibindo resultados{combinedFilters}</>;
  };

  return (
    <section className={`w-full flex flex-col gap-4 mt-8 pt-16 text-gray-80 ${horizontalPadding}`}>
      <div className="flex justify-between">
        <h1 className="flex text-4xl font-medium">Todos os eventos</h1>
        <CustomTextField
          label="Buscar por evento"
          startIcon={<SearchOutlinedIcon />}
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
      <Divider className="bg-gray-200" />
      <div className="flex justify-between pt-11">
        <div className="grid grid-cols-2 grid-rows-2 gap-x-8 w-[440px]">
          <div className="flex items-center gap-2">
            <PlaceOutlinedIcon sx={{height: 16, width: 16}} />
            <span>Estado selecionado</span>
          </div>
          <div className="flex items-center gap-2">
            <EventIcon sx={{height: 16, width: 16}} />
            <span>Selecionar período</span>
          </div>
          <Select
            id="select-filter-federal-unity"
            value={selectedFederalUnity}
            onChange={(e) => setSelectedFederalUnity(e.target.value)}
            size="small"
          >
            <MenuItem value="all">Todos os estados</MenuItem>
            {federalUnityParameters.map((fu) => (
              <MenuItem key={fu.initials} value={fu.initials}>
                {fu.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            id="select-filter-period"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            size="small"
          >
            <MenuItem value="all">Todos os períodos</MenuItem>
            {periodParameters.map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          className="h-fit"
          variant="text"
          size="small"
          endIcon={<SwapHorizIcon className="text-gray-80" />}
          sx={{color: 'black'}}
        >
          <span className="text-gray-80">Ordenar por</span>
        </Button>
      </div>
      <span className="py-2 text-gray-60">{getFilterStatusMessage()}</span>
      <div className="w-full pb-8">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <Link key={index} href={`/events/${event.id}`}>
                <EventCard eventData={event} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full h-96 flex flex-col flex-wrap justify-center content-center items-center">
            <Image
              className="py-4"
              src={'/kart-red.png'}
              alt="no results red kart"
              width={42}
              height={28}
            />
            <span>Ops! Não encontramos nenhum resultado.</span>
            <span>Refaça sua pesquisa e busque por outras palavras-chaves.</span>
          </div>
        )}
      </div>
    </section>
  );
}
