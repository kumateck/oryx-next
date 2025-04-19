export type Attachment = {
  link: string;
  name: string;
  id: string;
  reference: string;
  size?: string;
};

export type Tag = {
  name: string;
  id: string;
};

export type type = {
  id: string;
  name: string;
  isDisabled: boolean;
};

export type Site = {
  id: string;
  name: string;
  isDisabled: boolean;
};

export type Severity = {
  id: string;
  name: string;
  isDisabled: boolean;
};

export type WorkRelated = {
  id: string;
  name: string;
  isDisabled: boolean;
};

export type CreatedBy = {
  id: string;
  name: string;
  isDisabled: boolean;
};

export type Actions = {
  open: number;
  closed: number;
};

interface User {
  id: string;
  name: string;
  isDisabled: boolean;
}

export interface AffectedUser {
  id: string;
  user: User;
  name: string | null;
  isFatality: boolean;
  internal: boolean;
  injuryCases: any[]; // Update this type with a more specific type if needed
}
export interface Witness {
  internal: string | null;
  external: string | null;
}

export type ManageRoles = {
  id: string;
  title: string;
  number: string;
  dateOccured: string;
  type: type;
  site: Site;
  sites: Site[];
  affectedUsers: AffectedUser[];
  severity: Severity;
  workRelated: WorkRelated;
  witnesses: Witness[];
  status: string;
  createdBy: CreatedBy;
  notes: string | null;
  rootCauseDescription: string;
  specificLocation: string;
  actions: Actions;
  createdAt: string;
  tags: Tag[];
  attachments: Attachment[];
  types: type[];
  costs: Costs[];
  findings: Findings[];
};

export type Role = {
  displayName: string;
  name: string;
  id: string;
};

//   export type IncidentData = {
//     data: Incident[];
//     pageIndex: number;
//     pageCount: number;
//     totalRecordCount: number;
//     numberOfPagesToShow: number;
//     startPageIndex: number;
//     endPageIndex: number;
//   };

interface CostType {
  typeId: string;
  name: string;
}

interface Currency {
  id: string;
  name: string;
  symbol: string;
  isSeeded: boolean;
}

interface Model {
  id: string;
  title: string;
  notes: string;
  reference: string;
  site: string | null;
  isFilled: boolean;
}

interface ResponsiblePerson {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface Status {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface Action {
  id: string;
  reference: string;
  title: string;
  model: Model;
  modelType: string;
  description: string;
  dueDate: string;
  responsiblePerson: ResponsiblePerson;
  status: Status;
  createdBy: CreatedBy;
  extraJson: string | null;
  comments: any[]; // Replace with a more specific type if known
  history: any[]; // Replace with a more specific type if known
  responsiblePersons: any[]; // Replace with a more specific type if known
  attachments: any[]; // Replace with a more specific type if known
}

export interface Costs {
  id: string;
  title: string;
  amount: number;
  ratePerHour: number;
  quantity: number;
  totalCost: number;
  incursionDate: string;
  costTypes: CostType[];
  currency: Currency;
  description: string;
  notes: string | null;
  actions: Action[];
}

interface CauseType {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface EffectType {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface ItemType {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface ActionCounts {
  open: number;
  closed: number;
}

export interface Findings {
  id: string;
  title: string;
  reference: string | null;
  criteria: string;
  issueDescription: string;
  recommendations: string;
  referenceNumber: string;
  cause: string;
  effect: string;
  status: string;
  causeTypes: CauseType[];
  effectTypes: EffectType[];
  itemTypes: ItemType[];
  sites: Site[];
  site: Site | null;
  actionCounts: ActionCounts;
  actions: any[]; // You can specify the structure of actions if known
  inspection: any | null; // Adjust the type based on expected data structure
  audit: any | null; // Adjust the type based on expected data structure
  createdAt: string;
  attachments: any[]; // Specify the structure of attachments if known
}
