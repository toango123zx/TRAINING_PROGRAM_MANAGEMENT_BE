import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { PrismaService } from '../database/services';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCommandHandlers } from './commands/handlers';
import { RoleRepository } from '../role/repositories/role.repository';
import { LecturerRepository } from '../lecturer/repositories/lecturer.repository';
import { UserQueryHandlers } from './queries/handlers';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
	imports: [CqrsModule],
	controllers: [UserController],
	providers: [
		UserRepository,
		RoleRepository,
		LecturerRepository,
		PrismaService,
		CloudinaryService,
		...UserCommandHandlers,
		...UserQueryHandlers,
	],
})
export class UserModule {}
