import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EnrollClassCommand } from '../implements';
import { ClassRepository } from '../../repositories';

@CommandHandler(EnrollClassCommand)
export class EnrollClassHandler implements ICommandHandler<EnrollClassCommand> {
	constructor(private readonly classRepository: ClassRepository) {}

	async execute(command: EnrollClassCommand): Promise<any> {
		const { id_user, id_class } = command;

		return await this.classRepository.enroll(id_user, id_class);
	}
}
