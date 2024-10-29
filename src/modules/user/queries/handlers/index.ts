import { GetAllLecturerHandler } from './get-all-lecturer.handler';
import { GetAllStudentHandler } from './get-all-student.handler';
import { GetUsersHandler } from './get-user.handler';

export const UserQueryHandlers = [
	GetUsersHandler,
	GetAllLecturerHandler,
	GetAllStudentHandler,
];
