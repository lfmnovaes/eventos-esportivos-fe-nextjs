export type EventCardInfo = {
  cardImagePath: string;
  status: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  event: string;
  location: string;
}

export type EventCard = {
  id: string;
  name: string;
  starts_at: string;
  ends_at: string;
  banner_image: string;
  address: {
    place: string;
    city: string;
    federal_unit: string;
  }
  status: string;
}

export type HomeTemplate = {
  template: {
    id: string;
    name: string;
  };
  has_events: boolean;
  has_courses: boolean;
  primary_color: string;
  secondary_color: string;
  banner_image: string;
  description: string;
  gallery_images: {
    id: string;
    image: string;
  }[];
  last_events: EventCard[];
}
