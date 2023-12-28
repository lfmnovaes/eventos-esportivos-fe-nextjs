'use client';

import type {MouseEvent} from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {useAtomValue} from 'jotai';
import type {EventData, FederalUnityParameters} from '@/app/lib/definitions';
import {
  horizontalPaddingAtom,
  periodParametersAtom,
  allEventsDataAtom,
  allFUParametersAtom
} from '@/app/atoms';
import dayjs from 'dayjs';
import {Button, Divider, Menu, MenuItem, Select} from '@mui/material';
import {
  SearchOutlined as SearchOutlinedIcon,
  SwapHoriz as SwapHorizIcon,
  Event as EventIcon,
  PlaceOutlined as PlaceOutlinedIcon,
  AccountBoxOutlined as AccountBoxOutlinedIcon
} from '@mui/icons-material';
import {useRouterParams} from '@/app/lib/useRouterParams';
import CustomTextField from '@/app/ui/components/text-field';
import EventCard from '@/app/ui/event-card';
import {capitalizeFirstLetter} from '@/app/lib/utils';
import {getFilterStatusMessage} from './getFilterStatusMessage';

function OrderMenuItem({
  label,
  orderType,
  currentOrder,
  onSelect
}: {
  label: string;
  orderType: string;
  currentOrder: string;
  onSelect: (type: string) => void;
}) {
  const isActive = orderType === currentOrder;

  return (
    <MenuItem
      onClick={() => onSelect(orderType)}
      sx={{backgroundColor: isActive ? '#f0f0f0' : 'transparent'}}
    >
      {label}
    </MenuItem>
  );
}

const categories = ['mirim', 'cadete', 'adulto'];

export default function EventsPage() {
  const {companySlug} = useParams<{companySlug: string}>();
  const allEventsData = useAtomValue(allEventsDataAtom);
  const allFUParameters = useAtomValue(allFUParametersAtom);
  const periodParameters = useAtomValue(periodParametersAtom);
  const horizontalPadding = useAtomValue(horizontalPaddingAtom);

  const eventsData = allEventsData.get(companySlug) as EventData[];
  const federalUnityParameters = allFUParameters.get(companySlug) as FederalUnityParameters;

  const {queryParams, updateQueryParams} = useRouterParams({
    defaultParams: {
      federal_unity: 'all',
      period: 'all',
      category: 'all',
      order: 'most_recent',
      search: ''
    }
  });

  const [selectedFederalUnity, setSelectedFederalUnity] = useState(
    queryParams.get('federal_unity') || 'all'
  );
  const [selectedPeriod, setSelectedPeriod] = useState(queryParams.get('period') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || 'all');
  const [selectedOrder, setSelectedOrder] = useState(queryParams.get('order') || 'most_recent');
  const [searchInput, setSearchInput] = useState(queryParams.get('search') || '');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    updateQueryParams({
      federal_unity: selectedFederalUnity,
      period: selectedPeriod,
      category: selectedCategory,
      order: selectedOrder,
      search: searchInput
    });
  }, [
    selectedFederalUnity,
    selectedPeriod,
    selectedCategory,
    selectedOrder,
    searchInput,
    updateQueryParams
  ]);

  const handleOpenOrderMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOrderMenu = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const handleOrderChange = (newOrder: string) => {
    setSelectedOrder(newOrder);
    handleCloseOrderMenu();
  };

  const sortEvents = (events: EventData[], order: string) => {
    return [...events].sort((a, b) => {
      const timeA = dayjs(a.starts_at);
      const timeB = dayjs(b.starts_at);
      return order === 'most_recent' ? timeA.diff(timeB) : timeB.diff(timeA);
    });
  };

  const filteredEvents = sortEvents(
    eventsData.filter((event) => {
      const eventStart = dayjs(event.starts_at);
      const isFederalUnityMatch =
        selectedFederalUnity === 'all' || event.address.federal_unity === selectedFederalUnity;
      const isPeriodMatch =
        selectedPeriod === 'all' || eventStart.isSame(dayjs(`${selectedPeriod}-01-01`), 'year');
      const isCategoryMatch =
        selectedCategory === 'all' ||
        event.categories.some(
          (category) => category.name.toLowerCase() === selectedCategory.toLowerCase()
        );
      const isSearchMatch =
        !searchInput || event.name.toLowerCase().includes(searchInput.toLowerCase());
      return isFederalUnityMatch && isPeriodMatch && isCategoryMatch && isSearchMatch;
    }),
    selectedOrder
  );

  const filterStatusMessage = getFilterStatusMessage(
    selectedFederalUnity,
    selectedPeriod,
    selectedCategory,
    searchInput
  );

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
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 md:gap-8">
          <div>
            <div className="flex items-center gap-2">
              <PlaceOutlinedIcon sx={{height: 16, width: 16}} />
              <span>Estado selecionado</span>
            </div>
            <Select
              id="select-filter-federal-unity"
              value={selectedFederalUnity}
              onChange={(e) => setSelectedFederalUnity(e.target.value)}
              size="small"
              sx={{width: 200}}
            >
              <MenuItem value="all">Todos os estados</MenuItem>
              {federalUnityParameters.map((fu) => (
                <MenuItem key={fu.initials} value={fu.initials}>
                  {fu.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <EventIcon sx={{height: 16, width: 16}} />
              <span>Selecionar período</span>
            </div>
            <Select
              id="select-filter-period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              size="small"
              sx={{width: 200}}
            >
              <MenuItem value="all">Todos os períodos</MenuItem>
              {periodParameters.map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <AccountBoxOutlinedIcon sx={{height: 16, width: 16}} />
              <span>Selecionar categoria</span>
            </div>
            <Select
              id="select-filter-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              size="small"
              sx={{width: 200}}
            >
              <MenuItem value="all">Todas as categorias</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {capitalizeFirstLetter(category)}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <Button
          className="h-fit"
          variant="text"
          size="small"
          onClick={handleOpenOrderMenu}
          endIcon={<SwapHorizIcon className="text-gray-80" />}
          sx={{color: 'black'}}
        >
          <span className="text-gray-80">Ordenar por</span>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseOrderMenu}
          disableScrollLock={true}
        >
          <OrderMenuItem
            label="Mais próximos"
            orderType="most_recent"
            currentOrder={selectedOrder}
            onSelect={handleOrderChange}
          />
          <OrderMenuItem
            label="Mais distantes"
            orderType="oldest"
            currentOrder={selectedOrder}
            onSelect={handleOrderChange}
          />
        </Menu>
      </div>
      <span className="py-2 text-gray-60">{filterStatusMessage}</span>
      <div className="w-full pb-8">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <Link key={index} href={`/${companySlug}/events/${event.slug}`}>
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
