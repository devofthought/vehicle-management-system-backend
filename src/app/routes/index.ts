import express from 'express';
import { SuperAdminRoutes } from '../modules/superAdmin/superAdmin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/super-admin',
    route: SuperAdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
