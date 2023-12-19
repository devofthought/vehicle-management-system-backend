import express from 'express';
import { SuperAdminRoutes } from '../modules/superAdmin/superAdmin.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/super-admin',
    route: SuperAdminRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
