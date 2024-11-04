import { GetAllLecturerHandler } from './get-all-lecturer.handler';
import { GetLecturerByIdHandler } from './get-lecturer-by-id.handler';

export const LecturerQueryHandler = [GetLecturerByIdHandler, GetAllLecturerHandler];
