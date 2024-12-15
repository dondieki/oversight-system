import { UserRole } from 'src/app/enums/user.roles.enums';
import { ISideNav } from 'src/app/interfaces/sidenav.interface';

export const SideNavList: ISideNav[] = [
  {
    name: 'Dashboard',
    link: 'dashboard',
    icon: 'dashboard',
    roles: [UserRole.Admin, UserRole.Supervisor],
  },
  {
    name: 'Users',
    link: 'users',
    icon: 'account_circle',
    roles: [UserRole.Admin, UserRole.Supervisor],
  },
  {
    name: 'Aiports',
    link: 'airports',
    icon: 'flight_takeoff',
    roles: [UserRole.Admin, UserRole.Supervisor, UserRole.Inspector],
  },
  {
    name: 'Airlines',
    link: 'airlines',
    icon: 'airplanemode_active',
    roles: [UserRole.Admin, UserRole.Supervisor, UserRole.Inspector],
  },
  {
    name: 'Maintenance Org.',
    link: 'maintenance-organizations',
    icon: 'bubble_chart',
    roles: [UserRole.Admin, UserRole.Supervisor, UserRole.Inspector],
  },
  {
    name: 'ANS Stations',
    link: 'ans-stations',
    icon: 'flight_takeoff',
    roles: [UserRole.Admin, UserRole.Supervisor, UserRole.Inspector],
  },
  {
    name: 'Inspections',
    link: 'inspections',
    icon: 'search',
    roles: [UserRole.Admin, UserRole.Supervisor, UserRole.Inspector],
  },
  {
    name: 'Issues',
    link: 'issues',
    icon: 'report_problem',
    roles: [UserRole.Admin, UserRole.Supervisor, UserRole.Inspector],
  },
].sort();
