import { deleteClassByIdHandler } from './deleteClassById.handler';
import { UpdateClassHandler } from './updateClass.handler';

export const CommandHandlers = [UpdateClassHandler, deleteClassByIdHandler];
