import { Router } from 'express'
import multer from 'multer'
import { CreateUserController } from '@modeles/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modeles/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import uploadConfig from '../../../../config/upload'; 


const usersRoutes = Router()
// usersRoutes.use(ensureAuthenticated)

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes }

