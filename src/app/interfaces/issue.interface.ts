export interface IIssue {
  _id: string;
  airportId?: any | null;
  maintenanceOrgId?: any | null;
  ansStationId?: any | null;
  airlineId?: any | null;
  runwayId?: any | null;
  taxiwayId?: any | null;
  inspectionType: string;
  entity: string;
  isResolved: boolean;
  comment: string;
  createdAt: number;
  updatedAt: number;
}
