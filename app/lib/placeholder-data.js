export const initialTemplateData = {
  template: {
    id: 1,
    name: 'Template 0'
  },
  has_events: true,
  has_courses: true,
  primary_color: '#072342',
  secondary_color: '#52FFEC',
  banner_image: '/media/home_templates/banners/banner.png',
  description:
    'Paixão pela velocidade, gosto pelo convívio em ambientes altamente competitivos e a busca pela excelência naquilo que faz são algumas das características que fazem o sucesso da TECHSPEED, líder de mercado na produção e comercialização de chassis, equipamentos e acessórios destinados à competição de karts no Brasil.\r\n\r\nA empresa tem como missão levar ao consumidor final o melhor produto do mercado a um preço justo e competitivo. Seus gestores e funcionários estão altamente motivados e compromissados em fabricar no Brasil equipamentos de padrão europeu, tanto em performance como em qualidade. Os produtos fabricados pela TECHSPEED são diferenciados e com padrão de qualidade reconhecidamente refinado.\r\n\r\nBuscamos implementar soluções incessantemente inovadoras, graças à manutenção de uma equipe de técnicos e engenheiros do mais alto nível. Um dos fatores que promovem o sucesso da TECHSPEED está no processo de pesquisa e desenvolvimento tecnológico, claramente evidenciados em todas as ações de lançamento de novos produtos.',
  gallery_images: [
    {
      id: 3,
      image: '/media/home_templates/gallery/587996b178aaf0ab0be5846d309d6579.png'
    },
    {
      id: 4,
      image: '/media/home_templates/gallery/587996b178aaf0ab0be5846d309d6579_kJMYzVW.png'
    }
  ],
  last_events: [
    {
      id: 1,
      name: 'Campeonato Gaúcho',
      starts_at: '2023-12-11T20:53:26Z',
      ends_at: '2023-12-15T20:53:35Z',
      banner_image: '/media/events/banner_images/banner.png',
      address: {
        place: 'Kartódromo Internacional',
        city: 'Penha',
        federal_unity: 'SC'
      },
      status: 'open'
    }
  ]
};

export const initialFooterData = {
  name: 'TechSpeed',
  logo_image: '/media/companies/logos/logo.png',
  terms_and_policies: '/media/companies/terms_and_policies/Vendas_em_Acao-PDF.pdf',
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

export const placeholderSlideData = [
  {
    cardImagePath: '/card1.jpg',
    status: 'active',
    title: 'Campeonato Gaúcho - Tarumã',
    description: 'Campeonato Gaúcho de Velocidade no Asfalto',
    startDate: '2024-02-20T00:00:00.000Z',
    endDate: '2024-02-22T00:00:00.000Z',
    event: 'Kartódromo Tarumã',
    location: 'Tarumã - SC'
  },
  {
    cardImagePath: '/card2.jpg',
    status: 'active',
    title: 'Campeonato Internacional Techspeed',
    description: 'Campeonato Gaúcho de Velocidade no Asfalto',
    startDate: '2024-03-11T00:00:00.000Z',
    endDate: '2024-03-14T00:00:00.000Z',
    event: 'Kartódromo Tarumã',
    location: 'Tarumã - SC'
  },
  {
    cardImagePath: '/card3.jpg',
    status: 'soon',
    title: 'Campeonato Gaúcho TechSpeed',
    description: 'Campeonato Gaúcho de Velocidade no Asfalto',
    startDate: '2024-03-19T00:00:00.000Z',
    endDate: '2024-03-22T00:00:00.000Z',
    event: 'Kartódromo Tarumã',
    location: 'Tarumã - SC'
  },
  {
    cardImagePath: '/card4.jpg',
    status: 'active',
    title: 'Campeonato Gaúcho - Tarumã',
    description: 'Campeonato Gaúcho de Velocidade no Asfalto',
    startDate: '2024-02-20T00:00:00.000Z',
    endDate: '2024-02-22T00:00:00.000Z',
    event: 'Kartódromo Tarumã',
    location: 'Tarumã - SC'
  }
];
