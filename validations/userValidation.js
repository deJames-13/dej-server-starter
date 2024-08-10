import { check } from 'express-validator';

const userCreateRules = () => {
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ];
};

const userUpdateRules = () => {
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is invalid'),
  ];
};

export { userCreateRules, userUpdateRules };
