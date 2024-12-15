export interface IInspection {
  _id: string;
  airportId?: any | null;
  maintenanceOrgId?: any | null;
  ansStationId?: any | null;
  airlineId?: any | null;
  inspectorId: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  isComplete: boolean;
  _deadline: number;
  createdAt: number;
  updatedAt: number;
  __v: number;
}
