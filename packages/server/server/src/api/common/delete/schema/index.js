/* eslint-disable import/no-cycle */
import BoardApi from './board';
import BlogApi from './blog';
import UserApi from './user';
import OrganizationApi from './organization';
import PackageApis from './package';
import CourseApis from './course';
import AppointmentApis from './appointment';

export default [
  ...BoardApi,
  ...BlogApi,
  ...UserApi,
  ...OrganizationApi,
  ...PackageApis,
  ...CourseApis,
  ...AppointmentApis,
];
