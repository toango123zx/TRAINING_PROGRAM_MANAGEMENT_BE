import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ClassRepository } from '../../repositories/class.repository';
import {
	HttpException,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common/exceptions';
import { ClassEntity } from 'src/models';

import { DeleteClassByIdCommand } from '../implements';

import { HttpResponseBodySuccessDto } from 'src/common/dtos';

@CommandHandler(DeleteClassByIdCommand)
export class deleteClassByIdHandler
	implements ICommandHandler<DeleteClassByIdCommand>
{
	constructor(private readonly classRepository: ClassRepository) {}

	async execute(
		command: DeleteClassByIdCommand,
	): Promise<HttpResponseBodySuccessDto<ClassEntity> | HttpException> {
		try {
			const classData = await this.classRepository.getClassById(command.id);
			if (!classData) {
				return new NotFoundException('Class');
			}

			const newClassData = await this.classRepository.deleteClassById(
				command.id,
			);
			return { data: newClassData };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
