'use client';

import type {MouseEvent, KeyboardEvent, MouseEventHandler, ChangeEvent} from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {useAtomValue} from 'jotai';
import type {EventData, FederalUnityParameters} from '@/app/lib/definitions';
import {
  horizontalPaddingAtom,
  allEventsDataAtom,
  allPeriodsAtom,
  allFUParametersAtom
} from '@/app/atoms';
import dayjs from 'dayjs';
import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Select,
  Drawer,
  Accordion,
  AccordionSummary,
  IconButton,
  List,
  ListItemButton
} from '@mui/material';
import {
  SearchOutlined as SearchOutlinedIcon,
  SwapHoriz as SwapHorizIcon,
  Event as EventIcon,
  PlaceOutlined as PlaceOutlinedIcon,
  AccountBoxOutlined as AccountBoxOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
  CloseOutlined as CloseIcon,
  FilterAltOutlined as FilterAltOutlinedIcon
} from '@mui/icons-material';
import {useRouterParams} from '@/app/lib/useRouterParams';
import CustomTextField from '@/app/ui/components/text-field';
import EventCard from '@/app/ui/event-card';
import {capitalizeFirstLetter} from '@/app/lib/utils';
import SChip from '@/app/ui/components/schip';

const categories = ['mirim', 'cadete', 'adulto'];
// TODO: fetch categories from API

export default function EventsPage() {
  const {companySlug} = useParams<{companySlug: string}>();
  const allEventsData = useAtomValue(allEventsDataAtom);
  const allFUParameters = useAtomValue(allFUParametersAtom);
  const allPeriod = useAtomValue(allPeriodsAtom);
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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(false);

  const toggleDrawer = (open: boolean): MouseEventHandler<HTMLButtonElement> => {
    return (event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };
  };

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

  const handleOrderChange = (newOrder: string) => {
    setSelectedOrder(newOrder);
    handleCloseOrderMenu();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
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
        selectedPeriod === 'all' ||
        (eventStart.month() + 1 === parseInt(selectedPeriod.split('-')[0]) &&
          eventStart.year() === parseInt(selectedPeriod.split('-')[1]));
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

  const resetFederalUnity = () => setSelectedFederalUnity('all');
  const resetPeriod = () => setSelectedPeriod('all');
  const resetCategory = () => setSelectedCategory('all');
  const resetSearchInput = () => setSearchInput('');

  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpanded(isExpanded ? panel : false);
    };

  const handleClearFilters = () => {
    resetFederalUnity();
    resetPeriod();
    resetCategory();
  };

  return (
    <section className={`w-full flex flex-col gap-4 mt-8 pt-16 text-gray-80 ${horizontalPadding}`}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-4xl font-medium">Todos os eventos</h1>
        <Divider className="bg-gray-200 md:hidden" />
        <div className="flex justify-between gap-4">
          <CustomTextField
            label="Buscar por evento"
            startIcon={<SearchOutlinedIcon />}
            value={searchInput}
            onChange={handleSearchChange}
          />
          <div className="flex md:hidden">
            <Button
              variant="text"
              color="gray80"
              onClick={toggleDrawer(true)}
              endIcon={<FilterAltOutlinedIcon />}
            >
              Filtrar
            </Button>
          </div>
        </div>
      </div>
      <Divider className="bg-gray-200 hidden md:block" />
      <div className="hidden md:flex justify-between pt-11">
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
              {allPeriod.map((period) => (
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
          color="gray80"
          onClick={handleOpenOrderMenu}
          endIcon={<SwapHorizIcon />}
        >
          Ordenar por
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseOrderMenu}
          disableScrollLock={true}
        >
          <ListItemButton
            selected={selectedOrder === 'most_recent'}
            onClick={() => handleOrderChange('most_recent')}
          >
            Mais próximos
          </ListItemButton>
          <ListItemButton
            selected={selectedOrder === 'oldest'}
            onClick={() => handleOrderChange('oldest')}
          >
            Mais distantes
          </ListItemButton>
        </Menu>
      </div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{sx: {minWidth: '300px'}}}
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Filtrar por</h2>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{marginRight: '-8px'}}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex flex-col items-end">
            <Button
              variant="text"
              onClick={handleClearFilters}
              className="w-fit"
              sx={{marginRight: '-8px'}}
            >
              Limpar todos
            </Button>
          </div>
          <Divider />
          <div>
            <Accordion
              expanded={accordionExpanded === 'order'}
              onChange={handleChangeAccordion('order')}
              elevation={0}
              disableGutters
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: 0}}>
                <span>Ordenar por</span>
              </AccordionSummary>
              <List>
                <ListItemButton
                  selected={selectedOrder === 'most_recent'}
                  onClick={() => setSelectedOrder('most_recent')}
                >
                  Mais próximos
                </ListItemButton>
                <ListItemButton
                  selected={selectedOrder === 'oldest'}
                  onClick={() => setSelectedOrder('oldest')}
                >
                  Mais distantes
                </ListItemButton>
              </List>
            </Accordion>
            <Accordion
              expanded={accordionExpanded === 'federal_unity'}
              onChange={handleChangeAccordion('federal_unity')}
              elevation={0}
              disableGutters
              sx={{'&:before': {display: 'none'}}}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: 0}}>
                <span>Estado</span>
              </AccordionSummary>
              <List>
                <ListItemButton
                  selected={selectedFederalUnity === 'all'}
                  onClick={() => setSelectedFederalUnity('all')}
                >
                  Todos os estados
                </ListItemButton>
                {federalUnityParameters.map((fu) => (
                  <ListItemButton
                    key={fu.initials}
                    selected={selectedFederalUnity === fu.initials}
                    onClick={() => setSelectedFederalUnity(fu.initials)}
                  >
                    {fu.name}
                  </ListItemButton>
                ))}
              </List>
            </Accordion>
            <Accordion
              expanded={accordionExpanded === 'period'}
              onChange={handleChangeAccordion('period')}
              elevation={0}
              disableGutters
              sx={{'&:before': {display: 'none'}}}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: 0}}>
                <span>Período</span>
              </AccordionSummary>
              <List>
                <ListItemButton
                  selected={selectedPeriod === 'all'}
                  onClick={() => setSelectedPeriod('all')}
                >
                  Todos os períodos
                </ListItemButton>
                {allPeriod.map((period) => (
                  <ListItemButton
                    key={period}
                    selected={selectedPeriod === period}
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period}
                  </ListItemButton>
                ))}
              </List>
            </Accordion>
            <Accordion
              expanded={accordionExpanded === 'category'}
              onChange={handleChangeAccordion('category')}
              elevation={0}
              disableGutters
              sx={{'&:before': {display: 'none'}}}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: 0}}>
                <span>Categoria</span>
              </AccordionSummary>
              <List>
                <ListItemButton
                  selected={selectedCategory === 'all'}
                  onClick={() => setSelectedCategory('all')}
                >
                  Todas as categorias
                </ListItemButton>
                {categories.map((category) => (
                  <ListItemButton
                    key={category}
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {capitalizeFirstLetter(category)}
                  </ListItemButton>
                ))}
              </List>
            </Accordion>
          </div>
        </div>
      </Drawer>
      <div className="flex flex-wrap gap-2 pt-4 text-gray-60">
        {selectedFederalUnity !== 'all' && (
          <SChip label={selectedFederalUnity} onDelete={resetFederalUnity} />
        )}
        {selectedPeriod !== 'all' && <SChip label={selectedPeriod} onDelete={resetPeriod} />}
        {selectedCategory !== 'all' && (
          <SChip label={capitalizeFirstLetter(selectedCategory)} onDelete={resetCategory} />
        )}
        {searchInput && <SChip label={`"${searchInput}"`} onDelete={resetSearchInput} />}
        {!searchInput &&
          selectedFederalUnity === 'all' &&
          selectedPeriod === 'all' &&
          selectedCategory === 'all' && (
            <span className="text-gray-60">Exibindo todos os resultados</span>
          )}
      </div>
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
