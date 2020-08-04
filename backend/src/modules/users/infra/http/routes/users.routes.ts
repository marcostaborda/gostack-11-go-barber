import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouters = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouters.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouters;
