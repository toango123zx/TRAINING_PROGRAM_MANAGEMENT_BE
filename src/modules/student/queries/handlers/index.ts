import { GetAllStudentHandler } from './get-all-student.handler';
import { GetStudentByIdHandler } from './get-student-by-id.handler';

export const StudentQueryHandler = [GetAllStudentHandler, GetStudentByIdHandler];
