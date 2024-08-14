import { Router } from 'express';
import asyncHandler from 'express-async-handler';

const wrapAsync = (handlers) =>
  handlers.map((handler) => asyncHandler(handler));

export default (endpoints = []) => {
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
