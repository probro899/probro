/* eslint-disable import/no-cycle */
import BoardApi from './board';
import BlogApi from './blog';
import UserApi from './user';
import OrganizationAPi from './organization';
import PackageApis from './package';
import CoursesApis from './course';
import AppointmentApis from './appointment';

export default [
  ...BoardApi,
  ...BlogApi,
  ...UserApi,
  ...OrganizationAPi,
  ...PackageApis,
  ...CoursesApis,
  ...AppointmentApis,
];
