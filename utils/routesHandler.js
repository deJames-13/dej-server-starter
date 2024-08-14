import { Router } from 'express';
import asyncHandler from 'express-async-handler';

export const wrapAsync = (handlers) =>
  handlers.map((handler) => asyncHandler(handler));

export const endpointsHandler = (endpoints = []) => {
  const router = Router();
  if (!endpoints.length) return router;

  endpoints.forEach((endpoint) => {
    let { method, path = '/', controller } = endpoint;

    if (!method || !path || !controller) return;

    const handlers = wrapAsync(
      Array.isArray(controller) ? controller : [controller]
    );

    router[method](path, ...handlers);
  });
  return router;
};

export const routesHandler = (routes = []) => {
  const rootRouter = Router();
  if (!routes.length) return rootRouter;

  routes.forEach((route) => {
    let { url, router } = route;

    if (!url || !router) return;
    else if (Array.isArray(router)) router = endpointsHandler(router);
    else if (typeof router !== 'function') return;

    rootRouter.use(url, router);
  });
  return rootRouter;
};
