import { GetAllStudentHandler } from './get-all-student.handler';
import { GetUserByIdHandler } from './get-user-by-id.handler';
import { GetUsersHandler } from './get-user.handler';

export const UserQueryHandlers = [
	GetUsersHandler,
	GetAllStudentHandler,
	GetUserByIdHandler,
];
