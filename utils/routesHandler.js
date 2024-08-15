import { Router } from 'express';
import asyncHandler from 'express-async-handler';

/**
 * Validates the endpoint object.
 * @param {Object} endpoint - The endpoint object to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
const validateEndpoint = (endpoint) => {
  const { method, path, controller } = endpoint;
  return (
    typeof method === 'string' &&
    typeof path === 'string' &&
    (typeof controller === 'function' || Array.isArray(controller))
  );
};

/**
 * Validates the route object.
 * @param {Object} route - The route object to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
const validateRoute = (route) => {
  const { url, router } = route;
  return (
    typeof url === 'string' &&
    (typeof router === 'function' || Array.isArray(router))
  );
};

/**
 * Wraps an array of handlers with asyncHandler.
 * @param {Function[]} handlers - An array of handler functions.
 * @returns {Function[]} - An array of wrapped handler functions.
 */
export const wrapAsync = (handlers) =>
  handlers.map((handler) => asyncHandler(handler));

/**
 * Creates an Express router from an array of endpoint definitions.
 * @param {Object[]} endpoints - An array of endpoint objects.
 * @param {string} endpoints[].path - The path for the endpoint.
 * @param {string} endpoints[].method - The HTTP method for the endpoint (e.g., 'get', 'post').
 * @param {Function|Function[]} endpoints[].controller - The controller function or an array of middleware and controller functions.
 * @returns {Router} - An Express router with the defined endpoints.
 */
export const endpointsHandler = (endpoints = []) => {
  const router = Router();
  if (!endpoints.length) return router;

  endpoints.forEach((endpoint) => {
    if (!validateEndpoint(endpoint)) return;

    const { method, path = '/', controller } = endpoint;
    const handlers = wrapAsync(
      Array.isArray(controller) ? controller : [controller]
    );

    router[method](path, ...handlers);
  });
  return router;
};

/**
 * Creates an Express router from an array of route definitions.
 * @param {Object[]} routes - An array of route objects.
 * @param {string} routes[].url - The base URL for the route.
 * @param {Router|Object[]} routes[].router - An Express router or an array of endpoint objects.
 * @returns {Router} - An Express router with the defined routes.
 */
export const routesHandler = (routes = []) => {
  const rootRouter = Router();
  if (!routes.length) return rootRouter;

  routes.forEach((route) => {
    if (!validateRoute(route)) return;

    let { url, router } = route;
    if (!url || !router) return;
    else if (Array.isArray(router)) router = endpointsHandler(router);
    else if (typeof router !== 'function') return;

    rootRouter.use(url, router);
  });
  return rootRouter;
};
