/* eslint-disable import/no-cycle */
import BoardApi from './board';
import BlogApi from './blog';
import UserApi from './user';
import OrganizationAPi from './organization';
import PackageApis from './package';

export default [
  ...BoardApi,
  ...BlogApi,
  ...UserApi,
  ...OrganizationAPi,
  ...PackageApis,
];
