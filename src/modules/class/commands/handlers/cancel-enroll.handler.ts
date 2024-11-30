import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelEnrollCommand } from '../implements';
import { ClassRepository } from '../../repositories';

@CommandHandler(CancelEnrollCommand)
export class CancelEnrollHandler implements ICommandHandler<CancelEnrollCommand> {
	constructor(private readonly classRepository: ClassRepository) {}

	async execute(command: CancelEnrollCommand): Promise<any> {
		const { id_user, id_class } = command;

		return await this.classRepository.cancelEnroll(id_user, id_class);
	}
}
