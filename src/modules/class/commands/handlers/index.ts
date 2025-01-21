import { CancelEnrollHandler } from './cancel-enroll.handler';
import { EnrollClassHandler } from './enroll-class.handler';
import { UpdateClassHandler } from './updateClass.handler';
import { deleteClassByIdHandler } from './deleteClassById.handler';

export const CommandHandlers = [
	EnrollClassHandler,
	CancelEnrollHandler,
	UpdateClassHandler,
	deleteClassByIdHandler,
];
