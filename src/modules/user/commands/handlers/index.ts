import { CreateUserHandler } from './create-user.handler';
import { UpdateCurrentUserPasswordHandler } from './update-current-user-password.handler';
import { UpdateUserPasswordHandler } from './update-user-password.handler';
import { UpdateUserPhotoHandler } from './update-user-photo.handler';
import { UpdateUserHandler } from './update-user.handler';

export const UserCommandHandlers = [
	CreateUserHandler,
	UpdateUserHandler,
	UpdateUserPhotoHandler,
	UpdateUserPasswordHandler,
	UpdateCurrentUserPasswordHandler,
];
