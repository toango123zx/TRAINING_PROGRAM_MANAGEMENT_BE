import { CreateUserHandler } from './create-user.handler';
import { UpdateUserPhotoHandler } from './update-user-photo.handler';
import { UpdateUserHandler } from './update-user.handler';

export const UserCommandHandlers = [
	CreateUserHandler,
	UpdateUserHandler,
	UpdateUserPhotoHandler,
];
