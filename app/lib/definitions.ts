export type EventCardInfo = {
  cardImagePath: string;
  status: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  event: string;
  location: string;
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
  last_events: EventCard[];
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
    street: string;
    number: string;
    city: string;
    district: string;
    federal_unity: string;
    zip_code: string;
  };
};
