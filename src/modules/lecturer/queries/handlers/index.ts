import { GetAllLecturerHandler } from './get-all-lecturer.handler';
import { GetClassesByLecturerIdHandler } from './get-class-by-lecturer-id.handler';
import { GetLecturerByIdHandler } from './get-lecturer-by-id.handler';

export const LecturerQueryHandlers = [
	GetLecturerByIdHandler,
	GetAllLecturerHandler,
	GetClassesByLecturerIdHandler,
];
