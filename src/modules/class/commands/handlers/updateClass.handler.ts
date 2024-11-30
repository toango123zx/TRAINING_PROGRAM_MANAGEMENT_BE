import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClassCommand } from '../implements';
import { ClassRepository } from '../../repositories/class.repository';
import { HttpResponseBodySuccessDto } from 'src/common/dtos';
import { ClassEntity } from 'src/models';
import {
	HttpException,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common/exceptions';

@CommandHandler(UpdateClassCommand)
export class UpdateClassHandler implements ICommandHandler<UpdateClassCommand> {
	constructor(private readonly classRepository: ClassRepository) {}
	async execute(
		command: UpdateClassCommand,
	): Promise<HttpResponseBodySuccessDto<ClassEntity> | HttpException> {
		try {
			const classData = await this.classRepository.getClassById(
				command.classId,
			);

			if (!classData) {
				return new NotFoundException('Class');
			}
			const newClassData = await this.classRepository.updateClassById(
				classData.id_class,
				{ quantity: command.updateClassDto.quantity },
			);
			return { data: newClassData };
		} catch (error) {
			return new InternalServerErrorException();
		}
	}
}
