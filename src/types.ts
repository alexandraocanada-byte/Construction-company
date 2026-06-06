export interface ServiceItem {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  iconName: string;
  tags: string[];
}

export interface QuoteInputs {
  rooms: string[];
  qualityTier: 'standard' | 'premium' | 'legacy';
  sqft: number;
  customWood: 'none' | 'oak' | 'walnut' | 'reclaimed';
  includeDesignConsult: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  quoteZh: string;
  rating: number;
  date: string;
  reviewUrl?: string;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  titleZh: string;
  category: string;
  beforeUrl: string;
  afterUrl: string;
  description: string;
}
