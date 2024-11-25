import { CreateClassBySubjectIdHandler } from './createClassBySubjectId.handler';
import { CreateSubjectHandler } from './createSubject.handler';
import { DeleteSubjectHandler } from './deleteSubject.handler';
import { UpdateSubjectHandler } from './updateSubject.handler';

export const CommandHandlers = [
	CreateClassBySubjectIdHandler,
	CreateSubjectHandler,
	UpdateSubjectHandler,
	DeleteSubjectHandler,
];
