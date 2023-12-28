import type {
  CompanyData,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  PeriodParameters
} from '@/app/lib/definitions';

export const initialCompaniesData: CompanyData[] = [
  {
    id: 1,
    name: 'Tech Speed',
    slug: 'tech-speed'
  }
];

export const initialTemplateData: HomeTemplate = {
  template: {
    id: 1,
    name: 'Template 0'
  },
  has_events: true,
  has_courses: true,
  primary_color: '#072342',
  secondary_color: '#52FFEC',
  banner_image: '/hero-desktop.jpg',
  description:
    'Paixão pela velocidade, gosto pelo convívio em ambientes altamente competitivos e a busca pela excelência naquilo que faz são algumas das características que fazem o sucesso da TECHSPEED, líder de mercado na produção e comercialização de chassis, equipamentos e acessórios destinados à competição de karts no Brasil.\r\n\r\nA empresa tem como missão levar ao consumidor final o melhor produto do mercado a um preço justo e competitivo. Seus gestores e funcionários estão altamente motivados e compromissados em fabricar no Brasil equipamentos de padrão europeu, tanto em performance como em qualidade. Os produtos fabricados pela TECHSPEED são diferenciados e com padrão de qualidade reconhecidamente refinado.\r\n\r\nBuscamos implementar soluções incessantemente inovadoras, graças à manutenção de uma equipe de técnicos e engenheiros do mais alto nível. Um dos fatores que promovem o sucesso da TECHSPEED está no processo de pesquisa e desenvolvimento tecnológico, claramente evidenciados em todas as ações de lançamento de novos produtos.',
  gallery_images: [
    {
      id: 3,
      image: '/slideshow1.jpg'
    },
    {
      id: 4,
      image: '/slideshow2.jpg'
    },
    {
      id: 5,
      image: '/slideshow3.jpg'
    }
  ]
};

export function getAllInitialTemplateHomeData(): Map<string, HomeTemplate> {
  const templateHomeDataMap = new Map<string, HomeTemplate>();

  for (const company of initialCompaniesData) {
    templateHomeDataMap.set(company.slug, initialTemplateData);
  }

  return templateHomeDataMap;
}

export const initialFooterData: FooterData = {
  name: 'TechSpeed',
  logo_image: '/logo.png',
  terms_and_policies: '/Vendas_em_Acao-PDF.pdf',
  contact_info: {
    website: 'http://www.techspeedkart.com',
    email: '',
    phone: '+554834374488',
    instagram: 'https://www.instagram.com/techspeedkart',
    facebook: 'https://www.facebook.com/techspeedkart'
  },
  address: {
    street: 'Avenida Centenário',
    number: '500',
    city: 'Criciúma',
    district: 'Pinheirinho',
    federal_unity: 'SC',
    zip_code: '88804000'
  }
};

export function getAllInitialFooterData(): Map<string, FooterData> {
  const footerDataMap = new Map<string, FooterData>();

  for (const company of initialCompaniesData) {
    footerDataMap.set(company.slug, initialFooterData);
  }

  return footerDataMap;
}

export const initialEventsData: EventData[] = [
  {
    id: 1,
    name: 'Campeonato Gaúcho - Tarumã',
    slug: 'campeonato-gaucho-taruma',
    description:
      'Paixão pela velocidade, gosto pelo convívio em ambientes altamente competitivos e a busca pela excelência naquilo que faz são algumas das características que fazem o sucesso da TECHSPEED, líder de mercado na produção e comercialização de chassis, equipamentos e acessórios destinados à competição de karts no Brasil.',
    schedule:
      '07:00 - Abertura do evento\r\n08:00 - Dada a largada  | 13:00 - final da corrida\r\n13:10 - Divulgação dos campeões',
    starts_at: '2023-12-25T17:56:30Z',
    ends_at: '2023-12-29T17:56:32Z',
    ticket_sales_opens_at: '2023-12-22T17:56:32Z',
    ticket_sales_closes_at: '2024-01-04T17:56:34Z',
    banner_image: '/event1.jpg',
    address: {
      place: 'Kartódromo Tarumã',
      street: 'Rod. Beto Carrero World',
      number: null,
      city: 'Praia de Armação do Itapocorói',
      district: 'Penha',
      federal_unity: 'RS',
      zip_code: '88385000'
    },
    status: 'open',
    categories: [
      {
        id: 1,
        name: 'Mirim',
        minimum_age: 8,
        maximum_age: 9,
        price: '100.00'
      },
      {
        id: 2,
        name: 'Cadete',
        minimum_age: 12,
        maximum_age: 14,
        price: '90.00'
      },
      {
        id: 3,
        name: 'Adulto',
        minimum_age: 18,
        maximum_age: null,
        price: '80.00'
      }
    ],
    event_policy: '/mockPDF.pdf'
  },
  {
    id: 2,
    name: 'Campeonato Gaúcho',
    slug: 'campeonato-gaucho',
    description:
      'Paixão pela velocidade, gosto pelo convívio em ambientes altamente competitivos e a busca pela excelência naquilo que faz são algumas das características que fazem o sucesso da TECHSPEED, líder de mercado na produção e comercialização de chassis, equipamentos e acessórios destinados à competição de karts no Brasil.',
    schedule:
      '07:00 - Abertura do evento\r\n08:00 - Dada a largada\r\n13:00 - final da corrida\r\n13:10 - Divulgação dos campeões',
    starts_at: '2024-01-24T17:56:30Z',
    ends_at: '2024-01-30T17:56:32Z',
    ticket_sales_opens_at: '2023-12-22T12:00:00Z',
    ticket_sales_closes_at: '2024-01-23T23:59:59Z',
    banner_image: '/event2.jpg',
    address: {
      place: 'Kartódromo Tarumã 2',
      street: 'Rod. Beto Carrero World',
      number: null,
      city: 'Praia de Armação do Itapocorói',
      district: 'Penha',
      federal_unity: 'RS',
      zip_code: '88385000'
    },
    status: 'open_soon',
    categories: [
      {
        id: 1,
        name: 'Mirim',
        minimum_age: 8,
        maximum_age: 9,
        price: '100.00'
      },
      {
        id: 2,
        name: 'Cadete',
        minimum_age: 12,
        maximum_age: 14,
        price: '90.00'
      },
      {
        id: 3,
        name: 'Adulto',
        minimum_age: 18,
        maximum_age: null,
        price: '80.00'
      }
    ],
    event_policy: '/mockPDF.pdf'
  },
  {
    id: 3,
    name: 'Campeonato Internacional TechSpeed',
    slug: 'campeonato-internacional-techspeed',
    description:
      'Paixão pela velocidade, gosto pelo convívio em ambientes altamente competitivos e a busca pela excelência naquilo que faz são algumas das características que fazem o sucesso da TECHSPEED, líder de mercado na produção e comercialização de chassis, equipamentos e acessórios destinados à competição de karts no Brasil.',
    schedule:
      '07:00 - Abertura do evento\r\n08:00 - Dada a largada\r\n13:00 - final da corrida\r\n13:10 - Divulgação dos campeões',
    starts_at: '2023-12-25T17:56:30Z',
    ends_at: '2023-12-29T17:56:32Z',
    ticket_sales_opens_at: '2023-12-22T17:56:32Z',
    ticket_sales_closes_at: '2024-01-04T17:56:34Z',
    banner_image: '/event3.jpg',
    address: {
      place: 'Kartódromo Tarumã',
      street: 'Rod. Beto Carrero World',
      number: null,
      city: 'Praia de Armação do Itapocorói',
      district: 'Penha',
      federal_unity: 'RS',
      zip_code: '88385000'
    },
    status: 'open_soon',
    categories: [
      {
        id: 1,
        name: 'Mirim',
        minimum_age: 10,
        maximum_age: 13,
        price: '100.00'
      },
      {
        id: 2,
        name: 'Cadete',
        minimum_age: 14,
        maximum_age: 18,
        price: '90.00'
      },
      {
        id: 3,
        name: 'Adulto',
        minimum_age: 18,
        maximum_age: null,
        price: '80.00'
      }
    ],
    event_policy: '/mockPDF.pdf'
  },
  {
    id: 4,
    name: 'Campeonato Gaúcho TechSpeed',
    slug: 'campeonato-gaucho-techspeed',
    description:
      'Paixão pela velocidade, gosto pelo convívio em ambientes altamente competitivos e a busca pela excelência naquilo que faz são algumas das características que fazem o sucesso da TECHSPEED, líder de mercado na produção e comercialização de chassis, equipamentos e acessórios destinados à competição de karts no Brasil.',
    schedule:
      '07:00 - Abertura do evento\r\n08:00 - Dada a largada  | 13:00 - final da corrida\r\n13:10 - Divulgação dos campeões',
    starts_at: '2024-02-05T17:56:30Z',
    ends_at: '2024-02-09T17:56:32Z',
    ticket_sales_opens_at: '2024-01-04T17:56:32Z',
    ticket_sales_closes_at: '2024-02-04T17:56:34Z',
    banner_image: '/event4.jpg',
    address: {
      place: 'Kartódromo Tarumã',
      street: 'Rod. Beto Carrero World',
      number: null,
      city: 'Praia de Armação do Itapocorói',
      district: 'Penha',
      federal_unity: 'RS',
      zip_code: '88385000'
    },
    status: 'closed',
    categories: [
      {
        id: 1,
        name: 'Jovem',
        minimum_age: 11,
        maximum_age: 14,
        price: '100.00'
      },
      {
        id: 2,
        name: 'Cadete',
        minimum_age: 15,
        maximum_age: 18,
        price: '100.00'
      },
      {
        id: 3,
        name: 'Adulto',
        minimum_age: 18,
        maximum_age: null,
        price: '140.00'
      }
    ],
    event_policy: '/mockPDF.pdf'
  }
];

export function getAllInitialEventsData(): Map<string, EventData[]> {
  const eventsDataMap = new Map<string, EventData[]>();

  for (const company of initialCompaniesData) {
    eventsDataMap.set(company.slug, initialEventsData);
  }

  return eventsDataMap;
}

export const initialFederalUnityParameters: FederalUnityParameters = [
  {
    initials: 'RS',
    name: 'Rio Grande do Sul'
  },
  {
    initials: 'SC',
    name: 'Santa Catarina'
  }
];

export function getAllInitialFederalUnityParameters(): Map<string, FederalUnityParameters> {
  const federalUnityParametersMap = new Map<string, FederalUnityParameters>();

  for (const company of initialCompaniesData) {
    federalUnityParametersMap.set(company.slug, initialFederalUnityParameters);
  }

  return federalUnityParametersMap;
}

export const initialPeriodParameters: PeriodParameters = ['2022', '2023', '2024'];
