import { check } from 'express-validator';

const userCreateRules = () => {
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
    check('password_confirmation').custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Password confirmation does not match!');

      return value;
    }),
  ];
};

const userUpdateRules = () => {
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is invalid'),
  ];
};

export { userCreateRules, userUpdateRules };
