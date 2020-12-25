/* eslint-disable import/no-cycle */
import BoardApi from './board';
import BlogApi from './blog';
import UserApi from './user';
import OrganizationApi from './organization';
import PackageApis from './package';

export default [
  ...BoardApi,
  ...BlogApi,
  ...UserApi,
  ...OrganizationApi,
  ...PackageApis,
];
