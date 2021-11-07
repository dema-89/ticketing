import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email obbligatoria'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password deve avere fra i 4 e 20 caratteri'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email Utilizzata');
    }

    const user = User.build({ email, password });
    await user.save();

    return res.status(201).send(user);
  }
);

export { router as signupRouter };
