import { GetAllClassHandler } from './get-all-class.handler';
import { GetStudentsByClassIdHandler } from './get-students-by-class-id.handler';
import { GetClassByIdHandler } from './getClassById';

export const QueryHandlers = [
	GetAllClassHandler,
	GetStudentsByClassIdHandler,
	GetClassByIdHandler,
];
