import { GetAllStudentHandler } from './get-all-student.handler';
import { GetClassesByStudentIdHandler } from './get-classes-by-student-id.handler';
import { GetStudentByIdHandler } from './get-student-by-id.handler';

export const StudentQueryHandler = [
	GetAllStudentHandler,
	GetStudentByIdHandler,
	GetClassesByStudentIdHandler,
];
