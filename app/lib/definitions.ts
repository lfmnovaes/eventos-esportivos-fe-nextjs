export type CompanyData = {
  id: number;
  name: string;
  slug: string;
};

export type Category = {
  id: number;
  name: string;
  minimum_age: number;
  maximum_age: number | null;
};

export type EventStatusInfo = {
  text: string;
  color: 'success' | 'warning' | 'customError';
};

export type EventCard = {
  id: number;
  name: string;
  starts_at: string;
  ends_at: string;
  banner_image: string;
  address: {
    place: string;
    city: string;
    federal_unity: string;
  };
  status: string;
};

export type HomeTemplate = {
  template: {
    id: number;
    name: string;
  };
  has_events: boolean;
  has_courses: boolean;
  primary_color: string;
  secondary_color: string;
  banner_image: string;
  description: string;
  gallery_images: {
    id: number;
    image: string;
  }[];
};

export type FooterData = {
  name: string;
  logo_image: string;
  terms_and_policies: string;
  contact_info: {
    website: string;
    email: string;
    phone: string;
    instagram: string;
    facebook: string;
  };
  address: {
    federal_unity: string;
    line: string;
  };
};

export type CategoryWithPrice = Category & {price: string};

export type SimpleCategoryWithPrice = Omit<Category, 'minimum_age' | 'maximum_age'> & {
  price: string;
};

export type EventData = {
  id: number;
  name: string;
  slug: string;
  description: string;
  schedule: string;
  starts_at: string;
  ends_at: string;
  ticket_sales_opens_at: string;
  ticket_sales_closes_at: string;
  banner_image: string;
  address: {
    place: string;
    street: string;
    number: number | null;
    city: string;
    district: string;
    federal_unity: string;
    zip_code: string;
    geolocation: {
      latitude: string;
      longitude: string;
    } | null;
  };
  status: string;
  categories: SimpleCategoryWithPrice[];
  event_policy: string;
};

export type FederalUnityParameters = {
  initials: string;
  name: string;
}[];

export type PeriodParameters = Record<string, number[]>;

export type OtherParticipant = {
  fullname?: string;
  cpf?: string;
  cellphone?: string;
  category?: string;
  birthdate?: string;
};
