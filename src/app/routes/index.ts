import express from 'express';
import { SuperAdminRoutes } from '../modules/superAdmin/superAdmin.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { DriverRoutes } from '../modules/driver/driver.route';
import { HelperRoutes } from '../modules/helper/helper.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/super-admin',
    route: SuperAdminRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/driver',
    route: DriverRoutes,
  },
  {
    path: '/helper',
    route: HelperRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
