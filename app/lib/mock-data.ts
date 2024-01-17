import type {
  CompanyData,
  HomeTemplate,
  FooterData,
  EventData,
  FederalUnityParameters,
  PeriodParameters,
  Category
} from '@/app/lib/definitions';

export const initialCompaniesData: CompanyData[] = [
  {
    id: 1,
    name: 'Tech Speed',
    slug: 'tech-speed'
  }
];

export const initialCategoriesData: Category[] = [
  {
    id: 2,
    name: 'Cadete (PCK)',
    minimum_age: 9,
    maximum_age: 11
  },
  {
    id: 6,
    name: 'Graduado (PGK)',
    minimum_age: 14,
    maximum_age: 27
  },
  {
    id: 3,
    name: 'Júnior Menor (PJMK)',
    minimum_age: 11,
    maximum_age: 12
  },
  {
    id: 4,
    name: 'Júnior (PJK)',
    minimum_age: 12,
    maximum_age: 14
  },
  {
    id: 9,
    name: 'Kart Indoor',
    minimum_age: 13,
    maximum_age: 80
  },
  {
    id: 1,
    name: 'Mirim (PMK)',
    minimum_age: 8,
    maximum_age: 9
  },
  {
    id: 5,
    name: 'Novato (PNK)',
    minimum_age: 14,
    maximum_age: 27
  },
  {
    id: 7,
    name: 'Sênior AM (PSK-AM)',
    minimum_age: 28,
    maximum_age: 80
  },
  {
    id: 8,
    name: 'Sênior Pro (PSK-PRO)',
    minimum_age: 28,
    maximum_age: 80
  }
];

export function getInitialCategoriesData(): Map<number, Category> {
  const categoriesMap = new Map<number, Category>();

  initialCategoriesData.forEach((category: Category) => {
    categoriesMap.set(category.id, category);
  });

  return categoriesMap;
}

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
    federal_unity: 'SC',
    line: 'Av. Centenário, nº 500 - Pinheirinho\r\nCriciúma - SC - 88804-000'
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
      zip_code: '88385000',
      geolocation: null
    },
    status: 'open',
    categories: [
      {
        id: 1,
        name: 'Mirim (PMK)',
        price: '100.00'
      },
      {
        id: 2,
        name: 'Cadete (PCK)',
        price: '90.00'
      },
      {
        id: 3,
        name: 'Júnior Menor (PJMK)',
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
      zip_code: '88385000',
      geolocation: null
    },
    status: 'open_soon',
    categories: [
      {
        id: 4,
        name: 'Mirim (PMK)',
        price: '20.00'
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
      zip_code: '88385000',
      geolocation: null
    },
    status: 'open_soon',
    categories: [
      {
        id: 1,
        name: 'Mirim (PMK)',
        price: '100.00'
      },
      {
        id: 2,
        name: 'Cadete (PCK)',
        price: '90.00'
      },
      {
        id: 3,
        name: 'Júnior Menor (PJMK)',
        price: '80.00'
      }
    ],
    event_policy: '/mockPDF.pdf'
  },
  {
    id: 4,
    name: '48º Campeonato Catarinense de Kart 2024',
    slug: 'campeonato-catarinense-de-kart-2024',
    description:
      'Anotado aí? Campeonato Catarinense de Kart Pro 2024 é aqui, na nossa pista do Kartódromo Internacional Beto Carrero com o traçado invertido para dar mais emoção e adrenalina!!! Preparados?',
    schedule: 'A definir',
    starts_at: '2024-07-04T11:00:00Z',
    ends_at: '2024-07-06T21:00:00Z',
    ticket_sales_opens_at: '2024-01-01T11:00:00Z',
    ticket_sales_closes_at: '2024-07-03T21:00:00Z',
    banner_image: '/event4.jpg',
    address: {
      place: 'Kartódromo Tarumã',
      street: 'Rod. Beto Carrero World',
      number: null,
      city: 'Praia de Armação do Itapocorói',
      district: 'Penha',
      federal_unity: 'RS',
      zip_code: '88385000',
      geolocation: {
        latitude: '-27.506877',
        longitude: '-48.632154'
      }
    },
    status: 'closed',
    categories: [
      {
        id: 8,
        name: 'Cadete (PCK)',
        price: '590.00'
      },
      {
        id: 9,
        name: 'Mirim (PMK)',
        price: '590.00'
      },
      {
        id: 10,
        name: 'Júnior Menor (PJMK)',
        price: '890.00'
      },
      {
        id: 11,
        name: 'Graduado (PGK)',
        price: '890.00'
      },
      {
        id: 12,
        name: 'Júnior (PJK)',
        price: '890.00'
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

export function getAllInitialFUParametersData(): Map<string, FederalUnityParameters> {
  const federalUnityParametersMap = new Map<string, FederalUnityParameters>();

  for (const company of initialCompaniesData) {
    federalUnityParametersMap.set(company.slug, initialFederalUnityParameters);
  }

  return federalUnityParametersMap;
}

export const initialPeriodParameters: PeriodParameters = {
  '2024': [9],
  '2023': [12]
};

export function getAllInitialPeriodParameters(): Map<string, string[]> {
  const periodParametersMap = new Map<string, string[]>();

  for (const company of initialCompaniesData) {
    const formattedPeriodParameters = [];

    for (const year in initialPeriodParameters) {
      for (const month of initialPeriodParameters[year]) {
        formattedPeriodParameters.push(`${year}-${month.toString().padStart(2, '0')}`);
      }
    }

    periodParametersMap.set(company.slug, formattedPeriodParameters);
  }

  return periodParametersMap;
}
