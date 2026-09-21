export type TabType = 'showroom' | 'veiculo' | 'concierge' | 'studio';

export interface VehicleSpec {
  acceleration: string;
  power: string;
  topSpeed: string;
  downforce?: string;
  range?: string;
  transmission?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  series: string;
  edition: string;
  category: 'hipercarros' | 'gran-turismo' | 'eletricos-puros' | 'bespoke-vintage';
  tagBadge: string;
  tagColor: string;
  priceFormatted: string;
  priceNumeric: number;
  specs: VehicleSpec;
  image: string;
  description: string;
}

export interface PaintOption {
  id: string;
  name: string;
  subtitle: string;
  gradientClass: string;
  hex: string;
  threeColor: number;
  price: number;
  priceFormatted: string;
}

export interface WheelOption {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  priceFormatted: string;
}

export interface CaliperOption {
  id: string;
  name: string;
  colorClass: string;
  threeColor: number;
  price: number;
  priceFormatted: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  image: string;
  price: number;
  priceFormatted: string;
  stitching: string;
  ambientLight: string;
}

export interface SavedCar {
  id: string;
  title: string;
  status: string;
  statusColor: string;
  details: string;
  price: string;
  image: string;
}

export interface ConciergeBooking {
  mode: 'capuava' | 'heliponto' | 'serra';
  dateDay: number;
  timeSlot: 'morning' | 'sunset';
  temperature: number;
  soundtrack: string;
  champagne: boolean;
  notes?: string;
}
