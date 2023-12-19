export const initialTemplateData = {
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
  ],
  last_events: [
    {
      id: 1,
      name: 'Campeonato Gaúcho',
      starts_at: '2023-12-11T20:53:26Z',
      ends_at: '2023-12-15T20:53:35Z',
      banner_image: '/card1.jpg',
      address: {
        place: 'Kartódromo Tarumã',
        city: 'Tarumã',
        federal_unity: 'SC'
      },
      status: 'open_soon'
    },
    {
      id: 2,
      name: 'Campeonato Internacional TechSpeed',
      starts_at: '2023-12-25T00:00:00Z',
      ends_at: '2023-12-29T00:00:00Z',
      banner_image: '/card2.jpg',
      address: {
        place: 'Kartódromo Internacional',
        city: 'Penha',
        federal_unity: 'SC'
      },
      status: 'open'
    },
    {
      id: 3,
      name: 'Campeonato Gaúcho TechSpeed',
      starts_at: '2023-12-25T20:53:26Z',
      ends_at: '2023-12-29T20:53:35Z',
      banner_image: '/card3.jpg',
      address: {
        place: 'Kartódromo Internacional',
        city: 'Penha',
        federal_unity: 'SC'
      },
      status: 'open'
    },
    {
      id: 4,
      name: 'Campeonato Gaúcho - Tarumã',
      starts_at: '2024-01-11T20:53:26Z',
      ends_at: '2024-01-15T20:53:35Z',
      banner_image: '/card4.jpg',
      address: {
        place: 'Kartódromo Tarumã',
        city: 'Tarumã',
        federal_unity: 'SC'
      },
      status: 'open_soon'
    }
  ]
};

export const initialFooterData = {
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

export const initialEventsData = [
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
    banner_image: '/event-image.jpg',
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
    banner_image: '/event-image.jpg',
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
    banner_image: '/event-image.jpg',
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
    banner_image: '/event-image.jpg',
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
        name: 'Mirim',
        minimum_age: 8,
        maximum_age: 10,
        price: '100.00'
      },
      {
        id: 2,
        name: 'Jovem',
        minimum_age: 11,
        maximum_age: 14,
        price: '100.00'
      },
      {
        id: 3,
        name: 'Cadete',
        minimum_age: 15,
        maximum_age: 18,
        price: '100.00'
      },
      {
        id: 4,
        name: 'Adulto',
        minimum_age: 18,
        maximum_age: null,
        price: '140.00'
      }
    ],
    event_policy: '/mockPDF.pdf'
  }
];
