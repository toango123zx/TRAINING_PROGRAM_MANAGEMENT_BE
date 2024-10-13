import { GetSubjectByIdHandler } from './getSubjectById.handler';
import { GetSubjectsHandler } from './getSubjects.handler';
import { GetSubjectsByNameHandler } from './getSubjectsByName.handler';

export const QueryHandlers = [
	GetSubjectByIdHandler,
	GetSubjectsHandler,
	GetSubjectsByNameHandler,
];
