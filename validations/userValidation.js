import { check, checkSchema } from 'express-validator';

const matchPassword = (value, { req }) => {
  if (value !== req.body.password) throw new Error('Password does not match!');

  return value;
};

const userCreateRules = () => {
  // METHOD CHAINING
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
    check('password_confirmation').custom(matchPassword),
  ];
};

const userUpdateRules = () => {
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is invalid'),

    check('password')
      .optional()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
    check('password_confirmation').optional().custom(matchPassword),
  ];
};

export { userCreateRules, userUpdateRules };

// // USING SCHEMA: BUT i don't like it
// return checkSchema({
//   name: {
//     notEmpty: { errorMessage: 'Name is required!' },
//   },
//   email: {
//     isEmail: { errorMessage: 'Email is invalid!' },
//     notEmpty: { errorMessage: 'Email is required!' },
//   },
//   password: {
//     isLength: {
//       errorMessage: 'Password must be between 6 and 20 characters!',
//       options: { min: 6, max: 20 },
//     },
//   },
//   password_confirmation: {
//     custom: {
//       errorMessage: 'Password does not match!',
//       options: matchPassword,
//     },
//   },
// });
