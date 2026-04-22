export type UserRole = 'CONSULTANT' | 'MANAGER' | 'CUSTOMER';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'EXEMPTED';

export interface DemandSource {
  type: 'TEXT' | 'WECHAT' | 'FILE';
  content?: string;
  fileName?: string;
}

export interface StructuredDemand {
  departure: string;
  destination: string;
  budget: string;
  duration: string;
  groupType: string;
  preferences: string[];
}

export interface TravelScheme {
  id: string;
  direction: 'A' | 'B' | 'C';
  title: string;
  description: string;
  highlights: string[];
  days: {
    day: number;
    activity: string;
    description: string;
  }[];
  isDeepCustomized?: boolean;
}

export interface WorkOrder {
  id: string;
  customerName: string;
  customerContact: string;
  status: 'ANALYZING' | 'DIRECTIONAL_SCHEMES' | '9_9_PAYMENT' | 'DEEP_CUSTOMIZING' | 'DEPOSIT_PAYMENT' | 'COMPLETED';
  demandSources: DemandSource[];
  structuredDemand?: StructuredDemand;
  directionalSchemes: TravelScheme[];
  selectedSchemeId?: string;
  serviceFeeStatus: PaymentStatus;
  depositStatus: PaymentStatus;
  quote?: {
    total: number;
    deposit: number;
  };
  createdAt: string;
}
