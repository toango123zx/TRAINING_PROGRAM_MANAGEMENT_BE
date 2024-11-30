import { GetAllStudentHandler } from './get-all-student.handler';
import { GetAssignableSubjectsHandler } from './get-assignable-subject.handler';
import { GetClassesByStudentIdHandler } from './get-classes-by-student-id.handler';
import { GetStudentByIdHandler } from './get-student-by-id.handler';

export const StudentQueryHandlers = [
	GetAllStudentHandler,
	GetStudentByIdHandler,
	GetClassesByStudentIdHandler,
	GetAssignableSubjectsHandler,
];
